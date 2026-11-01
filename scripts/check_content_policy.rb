# frozen_string_literal: true

require "tmpdir"
require "fileutils"
require "open3"
require "rbconfig"

repo = File.expand_path("..", __dir__)
Dir.mktmpdir("worldcalendar-content-") do |tmp|
  source = File.join(tmp, "source")
  output = File.join(tmp, "output")
  FileUtils.mkdir_p(source)
  Dir.children(repo).reject { |name| %w[.git _site .bundle vendor .jekyll-cache].include?(name) }.each do |name|
    FileUtils.cp_r(File.join(repo, name), source)
  end
  FileUtils.mkdir_p(File.join(source, "_news", "ja"))
  make_post = lambda do |slug, date, draft|
    File.write(File.join(source, "_news", "ja", "#{slug}.md"), <<~POST)
      ---
      layout: article
      wide: true
      title: "Test #{slug}"
      description: "Integration test only; never published."
      language: ja
      publishedAt: "#{date}"
      updatedAt: "#{date}"
      draft: #{draft}
      translationKey: test-#{slug}
      permalink: /news/#{slug}/
      ---
      ## Test content
      PRIVATE-TEST-#{slug}
    POST
  end
  build = lambda do |expected_success|
    out, err, status = Open3.capture3(RbConfig.ruby, Gem.bin_path("jekyll", "jekyll"), "build", "--source", source, "--destination", output, chdir: repo)
    raise "Unexpected build result:\n#{out}\n#{err}" unless status.success? == expected_success
  end
  make_post.call("older", "2026-10-01", false)
  make_post.call("newer", "2026-10-20", false)
  make_post.call("private", "2026-10-21", true)
  build.call(true)
  listing = File.read(File.join(output, "news", "index.html"))
  raise "News order is wrong" unless listing.index("Test newer") < listing.index("Test older")
  raise "Individual news page missing" unless File.exist?(File.join(output, "news/newer/index.html"))
  raise "Draft file published" if File.exist?(File.join(output, "news/private/index.html"))
  raise "Draft listed" if listing.include?("Test private")
  raise "Draft in sitemap" if File.read(File.join(output, "sitemap.xml")).include?("/news/private/")
  # A published post changed back to draft must disappear on an ordinary rebuild.
  make_post.call("newer", "2026-10-20", true)
  build.call(true)
  raise "Stale draft output retained" if File.exist?(File.join(output, "news/newer/index.html"))
  make_post.call("invalid", "not-a-date", false)
  build.call(false)
  FileUtils.rm(File.join(source, "_news/ja/invalid.md"))
  make_post.call("missing", "2026-10-22", false)
  missing = File.join(source, "_news/ja/missing.md")
  File.write(missing, File.read(missing).sub(/^description:.*\n/, ""))
  build.call(false)
  puts "Content policy: news order, detail route, draft exclusion, stale output removal and metadata failures passed."
end
