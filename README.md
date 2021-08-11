# A personal website side project
- todos:
  - [ ] TypeScript re-factor
  - [ ] git actions CI for UI tests
  - [ ] touch screen optimization
    - [x] sidebar on blog page works with touchscreen
    - [ ] any potential further optimization coming in future...
  - [ ] ES-lint integration on husky git hooks
- Known bugs:
  - [x] Too many redirect error while directly access url in browser
    - [ ] This was fixed by removing `trailingSlash` config in `next.config.js`, still need to investigate the proper usage of it.
