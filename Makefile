build: clean static/css/style.css
	hugo

# Build CSS.
public/css/style.css: pre_static/css/normalize.css pre_static/css/main.css
	mkdir -p public/css
	cat $^ > $@

clean:
	rm -rf public

.PHONY: build
