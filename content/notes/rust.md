+++
type = "page"
title = "Rust Notes"
linktitle = "Rust"
+++

Collections of notes about the [Rust programming language].

[Rust programming language]: https://rust-lang.org

# Release Flags and Options

Release profile (in `Cargo.toml`).

```toml
[profile.release]
opt-level        = 3
strip            = "symbols"
debug            = false
debug-assertions = false
overflow-checks  = false
lto              = "fat"
panic            = "unwind"
incremental      = false
codegen-units    = 1
rpath            = false
```

See the [documentation][profile_docs] for information about each setting.

[profile_docs]: https://doc.rust-lang.org/cargo/reference/profiles.html

Compilation flags.

```bash
MACOSX_DEPLOYMENT_TARGET=$(sw_vers -productVersion) \
	RUSTFLAGS="-C target-cpu=native" \
	cargo build --release
```

Flags:
 * `MACOSX_DEPLOYMENT_TARGET` (macOS only) optimises for the macOS version.
 * `-C target-cpu=native` optimises the compiled code for the CPU.


# Rustdoc

Documenting private types.

```bash
cargo doc --document-private-items
```


# Sanitizers

See <https://github.com/japaric/rust-san> and the [documentation][san_docs].

[san_docs]: https://doc.rust-lang.org/nightly/unstable-book/compiler-flags/sanitizer.html

```bash
RUSTFLAGS="-Z sanitizer=leak"    cargo test --all-features --target x86_64-unknown-linux-gnu
RUSTFLAGS="-Z sanitizer=address" cargo test --all-features --target x86_64-unknown-linux-gnu
RUSTFLAGS="-Z sanitizer=memory"  cargo test --all-features --target x86_64-unknown-linux-gnu
RUSTFLAGS="-Z sanitizer=thread"  cargo test --all-features --target x86_64-unknown-linux-gnu
```


# A Makefile for Rust

Also see the [latest version] used in [Heph].

[latest version]: https://github.com/Thomasdezeeuw/heph/blob/master/Makefile
[Heph]: https://github.com/Thomasdezeeuw/heph

```make
# Targets available via Rustup that are supported.
TARGETS ?= x86_64-apple-darwin x86_64-unknown-linux-gnu x86_64-unknown-freebsd
# Command to run in `dev` target, e.g. `make RUN=check dev`.
RUN ?= test

test:
	cargo test

check:
	cargo check --all-features --all-targets

check_all_targets: $(TARGETS)
$(TARGETS):
	cargo check --all-features --workspace --all-targets --target $@

# NOTE: when using this command you might want to change the `test` target to
# only run a subset of the tests you're actively working on.
dev:
	find src/ tests/ examples/ Makefile Cargo.toml | entr -d -c $(MAKE) $(RUN)

clippy: lint
lint:
	cargo clippy --all-features

install_clippy:
	rustup component add clippy

doc:
	cargo doc --all-features

doc_private:
	cargo doc --all-features --document-private-items

clean:
	cargo clean

.PHONY: test check check_all check_all_targets dev clippy lint install_clippy doc doc_private clean
```
