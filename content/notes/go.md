+++
type = "page"
title = "Go notes"
+++

This is a collection tricks, ideas and other fun stuff I've collected in my time
programming in [go](https://golang.org).

# Code coverage

Get coverage and display it in a browser HTML.

```bash
$ go test -coverprofile cover.out
$ go tool cover -html cover.out
```
