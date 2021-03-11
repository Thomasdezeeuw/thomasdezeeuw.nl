build: build_pages build_css

build_pages:
	hugo

# Build CSS.
build_css: public/style.css
public/style.css: src/css/normalize.css src/css/highlight.css src/css/main.css
	mkdir -p public/css
	cat $^ > $@

clean:
	rm -rf public

.PHONY: build build_pages build_css
