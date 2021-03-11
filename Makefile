build: clean build_pages build_css

build_dev: build_css
	hugo  --buildDrafts --buildFuture

build_pages:
	hugo
	@# Remove some files we don't want.
	rm -rf public/page

# Build CSS.
build_css: public/style.css
public/style.css: src/css/normalize.css src/css/highlight.css src/css/main.css
	mkdir -p public/css
	cat $^ > $@

dev:
	find content/ src/ static/ themes/ config.toml Makefile | entr -d $(MAKE) build_dev

clean:
	rm -rf public

.PHONY: build build_dev build_pages build_css dev clean
