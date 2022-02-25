build: clean
	hugo --minify
	@# Remove some files we don't want.
	rm -rf public/page

dev:
	hugo server --buildDrafts --buildFuture

clean:
	rm -rf public resources

.PHONY: build dev clean
