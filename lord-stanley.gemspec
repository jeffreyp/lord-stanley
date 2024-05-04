# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "lord-stanley"
  spec.version       = "0.1.0"
  spec.authors       = ["Jeffrey Pratt"]
  spec.email         = ["jeffrey@jeffreypratt.org"]

  spec.summary       = "Lord Stanley theme for Jekyll website."
  spec.homepage      = "https://github.com/jeffreyp/lord-stanley"
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_data|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.3"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.17"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.1"

  spec.add_development_dependency "bundler"
end
