+++
type = "page"
title = "Go notes"
+++

This is a collection tricks, ideas and other fun stuff I've collected in my time
programming in [go](https://golang.org).

# Code Coverage

Get coverage and display it in a browser HTML.

```bash
go test -coverprofile cover.out
go tool cover -html cover.out
```


# Cross Platform Compiling

```bash
GOOS=$OS GOARCH=$ARCH go build -i -o app_$OS_$ARCH
```


# Building Static Binaries

```bash
CGO_ENABLED=0 go build -a -installsuffix cgo -ldflags '-s'

# For Raspberry Pi 1
CGO_ENABLED=0 GOOS=linux GOARCH=arm GOARM=6 go build -a -installsuffix cgo -ldflags '-s'

# For Raspberry Pi 2
CGO_ENABLED=0 GOOS=linux GOARCH=arm GOARM=7 go build -a -installsuffix cgo -ldflags '-s'
```


# List Imported Packages

```bash
# All packages including standard library
go list -f '{{join .Deps "\n"}}' | xargs go list -f '{{.ImportPath}}'

# Or all none standard library packages
go list -f '{{join .Deps "\n"}}' | xargs go list -f '{{if not .Standard}}{{.ImportPath}}{{end}}'
```


# Look at Compiler Optimisations

```bash
go build -gcflags=-m file.go
```


# Escape Analysis Info

```bash
go build -gcflags="-m"
```


# Profiling

```bash
go test -c # Compile the go test command to be run later
./$NAME.test -test.cpuprofile cpu.profile -test.memprofile mem.profile
go tool pprof --pdf $NAME.test mem.profile > mem.pdf
go tool pprof --pdf $NAME.test cpu.profile > cpu.pdf
```
