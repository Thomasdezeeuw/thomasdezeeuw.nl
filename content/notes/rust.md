+++
type = "page"
title = "Rust notes"
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
