# frozen_string_literal: true

require "date"

module WorldCalendar
  class SitePolicy < Jekyll::Generator
    safe false
    priority :lowest

    def generate(site)
      %w[calendars news].each do |name|
        site.collections.fetch(name).docs.each do |doc|
          %w[title description language publishedAt updatedAt draft translationKey permalink].each do |key|
            fail_build(doc, "missing #{key}") unless doc.data.key?(key)
          end
          %w[title description language translationKey permalink].each do |key|
            fail_build(doc, "#{key} must be a non-empty string") unless doc.data[key].is_a?(String) && !doc.data[key].strip.empty?
          end
          fail_build(doc, "invalid language") unless %w[ja en].include?(doc.data["language"])
          fail_build(doc, "draft must be a boolean") unless [true, false].include?(doc.data["draft"])
          %w[publishedAt updatedAt].each do |key|
            begin
              Date.iso8601(doc.data[key].to_s)
            rescue ArgumentError
              fail_build(doc, "#{key} must be YYYY-MM-DD")
            end
          end
          fail_build(doc, "updatedAt precedes publishedAt") if doc.data["updatedAt"].to_s < doc.data["publishedAt"].to_s
        end
        site.collections.fetch(name).docs.reject! { |doc| doc.data["draft"] }
      end

      pages = site.pages.select { |p| p.ext == ".html" || p.ext == ".md" } + site.collections.values.flat_map(&:docs)
      pages.each do |page|
        data = page.data
        data["lang"] = data["language"] || data["lang"] || "ja"
        # PageDrop#dir is Jekyll's source directory, not HTML text direction.
        data["text_direction"] = data.fetch("dir", "ltr")
        data["translationKey"] ||= page.url.sub(%r{\A/(en/)?}, "").sub(%r{/(ja|en)/}, "/")
        data["translationKey"] = "home" if ["/", "/en/"].include?(page.url)
        data["description"] ||= data["lang"] == "ja" ? "#{data['title']}。WorldCalendarの使い方・対応する暦・利用条件をご案内します。" : "#{data['title']}. Learn about WorldCalendar, its calendars, features and usage conditions."
        data["canonical_path"] ||= page.url
        if page.url == "/privacy-policy/"
          data["canonical_path"] = "/privacy-policy/ja/"
          data["noindex"] = true
        end
        if page.url.start_with?("/disclaimer/")
          data["canonical_path"] = "/terms-of-use/#{data['lang']}/"
          data["noindex"] = true
        end
      end
      public_pages = pages.reject { |p| p.data["noindex"] || p.data["sitemap"] == false }
      public_pages.group_by { |p| p.data["translationKey"] }.each_value do |group|
        fail_build(group.first, "duplicate language for translationKey") if group.map { |p| p.data["lang"] }.uniq.length != group.length
        alternates = group.map { |p| { "lang" => p.data["lang"], "url" => p.url } }
        group.each { |p| p.data["alternates"] = alternates }
      end
      site.data["public_pages"] = public_pages.sort_by(&:url)
    end

    def fail_build(doc, message)
      raise Jekyll::Errors::FatalException, "#{doc.path}: #{message}"
    end
  end
end
