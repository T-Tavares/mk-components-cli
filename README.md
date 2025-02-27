# MK Component CLI

Just a simple CLI tool to create base Components for React in batch.

## Installation

    npm i mk-components-cli --dev

You'll need to use npx to run the commands if install locally.

or, my prefered way. (no npx needed)

    npm i -g mk-components-cli

---

---

## Quick Start

there are three basic commands.

-   mk-config -> Deal with global configuration
-   mktsx -> Creates Typescript files
-   mkjsx -> Creates Javascript files

For all three try to run -h for more insights on what they do and the options they offer.

---

---

### mk-config

For inline documentaion

    mk-config -h

---

-current or -c -> Displays your current settings

    mk-config -current
    mk-config -c

---

-set-option -> Change Your settings.

This command takes 2 arguments that will be read as key and value. You just need to type them (no need to use {}). Ex:

    mk-config -set-option css false

That will not create CSS files when you use mktsx or mkjsx.

---

### Editing your config at the source

The following command will give you the source of your config file:

    mk-config -path
    mk-config -p

You can edit it manually. Just be aware of the options you're adding or the CLI will behave on a unexpectedly way. The accepted options are:

    functionType = 'arrow' | 'function';
    exportType = 'named' | 'default';
    css = boolean;
    cssModular = boolean;
    cssType = 'scss' | 'css';
    cssAlias = 'Any string that makes sense as css alias';

---

### mktsx & mkjsx

Create Components files with respective CSS and a link to it.
This CLI follows React best practices. For each component listed it'll create a folder and inside it a jsx and css files.

#### Consider the config below

    {
        functionType: 'arrow',
        exportType: 'named',
        css: true,
        cssModular: true,
        cssType: 'scss',
        cssAlias: 'ss'
    }

If you run

    mktsx Nav Footer Sidebar

It'll create the following files/structure

    .
    ├── Footer
    │   ├── Footer.module.scss
    │   └── Footer.tsx
    ├── Nav
    │   ├── Nav.module.scss
    │   └── Nav.tsx
    └── Sidebar
        ├── Sidebar.module.scss
        └── Sidebar.tsx

The css files will be empty. But the components files are filled with a basic structure for a component. Also respecting the configurations. On this case it'll be:

    import ss from './Nav.modular.scss';

    export const Nav: React.FC = () => {
        return (
            <div className={ss.container}>
                Component
            </div>
        );
    };

#### A different Config

    {
        functionType: 'function',
        exportType: 'default',
        css: true,
        cssModular: false,
        cssType: 'css',
        cssAlias: 'style'
    }

If you run:

    mktsx Nav Footer Sidebar

That will give you the following.

    .
    ├── Footer
    │   ├── Footer.css
    │   └── Footer.jsx
    ├── Nav
    │   ├── Nav.css
    │   └── Nav.jsx
    └── Sidebar
        ├── Sidebar.css
        └── Sidebar.jsx

With your component being.

    import "./Nav.css";

    function Nav() {
        return (
            <div className="">
                Nav
            </div>
        );
    };

    export default Nav;

# Thoughts

Want to collaborate on this project ?
Any ideas or bug to report?
Send me a PM, open a issue or pull request :D
