> **IMPORTANT** - This is a project based in Awesome app that replaces Native Web Components with NextJS.
> All the credits to [awesomeapp.org](https://awesomeapp.org) for this excelent backend in Rust with Tauri.


**See [awesomeapp.org](https://awesomeapp.org) for more info**

**[Discord Awesome App](https://discord.gg/XuKWrNGKpC) for any questions, issues, or anything else**

---

# Rust Base App Template for AWESOME-APP

Base desktop application code with Tauri, <del>Native Web Components</del> NextJS, and SurrealDB (follow the VMES app
architecture)

# <del>Hot Reload dev</del> Fast refresh dev

<del>For hot-reload UI and Tauri development, run the following in your VSCode from this root folder:</del>
[Fast refresh](https://nextjs.org/docs/basic-features/fast-refresh) is provided by NextJS, as simple as is :grin:

```sh
awesome-app dev
```

> **IMPORTANT** - Requires **node.js v18 or above**.


> This assumes `awesome-app` was installed locally (e.g., `cargo install awesome-app`)

# How it works

`awesome-app dev` will create an `Awesome.toml` which will be the list of commands it will run (format is
self-explanatory).

You can run the commands manually if you want, or see below for list of commands.

We recommend using `awesome-app dev` but running each command manually might help troubleshoot.

# Build manually

- `yarn install` - This will keep `node_modules` up to date.
- `cargo tauri icon src-tauri/icons/app-icon.png` - This will build the application icons.
- `next build && next export` - This
  will [build and export](https://nextjs.org/docs/advanced-features/static-html-export#next-export) Next.js project to
  be used by Tauri.
- `next dev` - This will run a localhost server with the previously exported `out/` folder as root (frontend hot
  reload).
- `cargo build` - This will update crates.
- In another terminal, `cargo tauri dev` - Will start the Tauri build and start the process.

<br />

## Requirements on fedora 36:

On Fedora, and probably linux, the following needs to be present on the system.

```sh
dnf install gtk3-devel
dnf install webkit2gtk3-jsc-devel 
dnf install libsoup-devel
dnf install webkit2gtk3-devel.x86_64
```

<br /><br />

## Happy Coding!:tada::tada::tada: