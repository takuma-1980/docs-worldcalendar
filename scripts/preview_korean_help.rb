# frozen_string_literal: true
# Local review only. No server is started; output is outside deployable _site.
require "yaml"
require "tmpdir"
require "open3"
require "rbconfig"

repo = File.expand_path("..", __dir__)
Dir.mktmpdir("worldcalendar-ko-review-") do |tmp|
  config = YAML.load_file(File.join(repo, "_config.yml"))
  config["exclude"] -= ["helps/ko"]
  config["korean_help_preview"] = true
  config_path = File.join(tmp, "config.yml")
  File.write(config_path, config.to_yaml)
  output = File.join(tmp, "site")
  command = [RbConfig.ruby, Gem.bin_path("jekyll", "jekyll"), "build", "--config", config_path,
             "--destination", output, "--trace"]
  abort "Preview build failed" unless system({"JEKYLL_ENV" => "development"}, *command, chdir: repo)
  [ ["python3", "scripts/check_site.py", output],
    ["python3", "scripts/check_contracts.py", output, "--korean-preview"],
    ["node", "--test", "tests/korean-help.test.cjs"] ].each do |check|
    abort "Preview verification failed" unless system({"KOREAN_HELP_SITE" => output}, *check, chdir: repo)
  end
  # The exact same config must fail when used in production.
  out, err, status = Open3.capture3({"JEKYLL_ENV" => "production"}, *command, chdir: repo)
  abort "Production gate failed: preview configuration was accepted" if status.success?
  abort "Unexpected gate failure: #{out}\n#{err}" unless (out + err).include?("Korean help is not approved")
  puts "Korean help: 12 local pages verified; production override rejected; temporary output removed on exit."
end
