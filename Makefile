build: clean
	hugo --minify
	@# Remove some files we don't want.
	rm -rf public/page

build_dev:
	hugo --buildDrafts --buildFuture

dev:
	find content/ src/ static/ themes/ config.toml Makefile | entr -d $(MAKE) build_dev

clean:
	rm -rf public

.PHONY: build build_dev dev clean
