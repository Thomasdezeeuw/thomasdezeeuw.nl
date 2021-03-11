+++
type = "blog-post"
title = "Hello world"
date = "2015-11-09T01:28:49+01:00"
slug = "hello-world"
description = "My first post"
+++

First post created with [Hugo](https://gohugo.io).

Since I like [go](https://golang.org), here is some go code.

```go
package main

import "os"

func main() {
	os.Stdout.WriteString("Hello world\n")
}
```

Build and run:

```bash
$ go build -o hello_world
$ ./hello_world
Hello world
```

I created a page for all kind of information about go called [go
notes](/notes/go/).
