# Project instructions

These rules apply to the entire project.

## Project structure

This is a static personal website and course catalog for Can Boz.

- `index.html`: Turkish-language page with navigation, introduction, biography, course cards, and footer links.
- `style.css`: shared styles, course layout, and responsive rules, including a 768px breakpoint.
- `images/`: local logo, portrait, and course artwork. Preserve existing filenames and references, including letter case.
- `.vscode/settings.json`: editor configuration; change only when relevant to the task.

There is no package manifest, build pipeline, local JavaScript file, or automated test suite in the current project. The HTML currently loads an external Font Awesome script. Do not expand external dependencies without explicit approval.

## Scope and content preservation

- Keep changes small and focused on the requested task. Avoid unrelated refactoring, reformatting, renaming, or cleanup.
- Preserve existing course content: titles, descriptions, prices, ordering, artwork, enrollment links, and coupon parameters unless the user explicitly requests changes.
- Do not invent course URLs or infer replacements from course titles. Leave missing or empty destinations unchanged and report them if relevant; request an authoritative URL when a change requires one.
- Preserve Turkish text and UTF-8 encoding. Do not translate or rewrite content incidentally.
- Do not introduce frameworks or add dependencies, packages, CDN libraries, tooling, or external services without explicit user approval.

## Coding conventions

- Use semantic HTML5 and native elements appropriate to their purpose: links for navigation, buttons for actions, and meaningful landmarks and headings.
- Use modern CSS3 in `style.css`. Prefer flexible layouts with Flexbox or Grid and responsive sizing over fixed dimensions that cause overflow.
- Define shared theme values, such as colors, spacing, and radii, as CSS custom properties in `:root`; reuse them in affected styles. Keep any conversion of existing values within the requested scope.
- Match nearby formatting: HTML uses four-space indentation and CSS uses two-space indentation. Preserve existing class names unless a task requires a change.
- Use vanilla JavaScript for any requested behavior. Keep scripts focused, use `const` or `let`, attach events with `addEventListener`, and avoid inline event handlers and unnecessary global variables.
- Keep core content and navigation usable without JavaScript whenever practical.
- Maintain responsive layouts, including the existing mobile behavior. Ensure images scale within their containers and text and course cards do not produce horizontal scrolling.

## Accessibility requirements

- Follow WCAG 2.2 AA practices for changed content and interactions.
- Maintain the page language (`lang="tr"`), meaningful landmarks, a logical heading hierarchy, and sensible document order.
- Give informative images meaningful alternative text and decorative images empty alternative text.
- Give every interactive control an accessible name, including icon-only social links. Prefer native HTML semantics; add ARIA only when needed.
- Support keyboard operation, logical focus order, and clearly visible focus indicators. Do not create keyboard traps or rely on hover alone.
- Maintain sufficient text and UI contrast; do not convey information through color alone.
- Keep content readable when zoomed and on narrow screens. Respect `prefers-reduced-motion` when adding animations or transitions.

## Verification before completion

- Test changes before declaring completion, using checks appropriate to their scope. Do not install testing tools or dependencies without explicit approval.
- For application changes, open `index.html` in a browser or use an available local static server. No build step is currently required.
- Inspect affected sections at narrow mobile and desktop widths and around the 768px breakpoint. Check wrapping, image sizing, clipping, and horizontal overflow, including at 200% zoom.
- Exercise changed links and interactions, check keyboard navigation and focus visibility, and inspect accessible names and image alternatives.
- Check the browser console and network panel for errors, missing assets, or failed resources introduced by the change.
- Compare affected course content and exact URL values, including query strings, with the original. Verify local asset paths and fragment targets; do not replace unavailable external destinations with guessed URLs.
- Review the final diff when version control is available; otherwise compare against a saved baseline. Confirm that only intended files and content changed.
- For documentation-only changes, review the instructions for accuracy and completeness and verify application files remain unchanged; browser testing is unnecessary.
- Report what was verified and any checks that could not be performed. Do not claim tests passed unless they were run.
