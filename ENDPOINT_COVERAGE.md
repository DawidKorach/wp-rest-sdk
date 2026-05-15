# WordPress REST API endpoint coverage

This document summarizes the WordPress REST API `wp/v2` endpoint families covered by this SDK.

The list is based on the bundled WordPress REST API reference files. Some routes in the upstream generated documentation contain regex fragments or optional route markers; this document normalizes them into readable placeholders such as `<id>`, `<parent>`, `<uuid>`, `<plugin>`, and `<stylesheet>`.

## Coverage model

| Category | SDK support | Notes |
| --- | --- | --- |
| Posts | Dedicated typed resource | `wp.posts` |
| Pages | Dedicated typed resource | `wp.pages` |
| Media | Dedicated typed resource | `wp.media`, including upload helper |
| Comments | Dedicated typed resource | `wp.comments` |
| Categories | Dedicated typed resource | `wp.categories` |
| Tags | Dedicated typed resource | `wp.tags` |
| Custom taxonomies | Generic typed resource | `wp.terms(restBase)` |
| Users | Dedicated typed resource | `wp.users` |
| Application passwords | Dedicated resource factory | `wp.applicationPasswords(userId)` |
| Settings | Dedicated generic resource | `wp.settings` |
| Search | Dedicated generic resource | `wp.search` |
| Post types, taxonomies, statuses | Dedicated metadata resources | `wp.postTypes`, `wp.taxonomies`, `wp.statuses` |
| Themes and plugins | Dedicated generic resources | `wp.themes`, `wp.plugins` |
| Blocks and patterns | Dedicated generic resources | Dynamic schemas by design |
| Menus and navigation | Dedicated generic resources | Dynamic schemas by theme/site setup |
| Site editor entities | Dedicated generic resources | Templates, template parts, global styles |
| Widgets and sidebars | Dedicated generic resources | Dynamic schemas by theme/plugins |
| Custom plugin endpoints | Low-level or generic resource | `wp.custom<TEntity>(restBase)` or `wp.client.request<T>()` |

## Endpoint families

### Application passwords

- `GET /wp/v2/users/<user_id>/application-passwords`
- `POST /wp/v2/users/<user_id>/application-passwords`
- `DELETE /wp/v2/users/<user_id>/application-passwords`
- `GET /wp/v2/users/<user_id>/application-passwords/<uuid>`
- `POST /wp/v2/users/<user_id>/application-passwords/<uuid>`
- `DELETE /wp/v2/users/<user_id>/application-passwords/<uuid>`
- `GET /wp/v2/users/<user_id>/application-passwords/introspect`

### Block directory items

- `GET /wp/v2/block-directory/search`

### Block pattern categories

- `GET /wp/v2/block-patterns/categories`

### Block patterns

- `GET /wp/v2/block-patterns/patterns`

### Block revisions and autosaves

- `GET /wp/v2/blocks/<id>/autosaves`
- `POST /wp/v2/blocks/<id>/autosaves`
- `GET /wp/v2/blocks/<parent>/autosaves/<id>`
- `GET /wp/v2/blocks/<parent>/revisions`
- `GET /wp/v2/blocks/<parent>/revisions/<id>`
- `DELETE /wp/v2/blocks/<parent>/revisions/<id>`

### Block types

- `GET /wp/v2/block-types`
- `GET /wp/v2/block-types/<namespace>`
- `GET /wp/v2/block-types/<namespace>/<name>`

### Blocks

- `GET /wp/v2/blocks`
- `POST /wp/v2/blocks`
- `GET /wp/v2/blocks/<id>`
- `POST /wp/v2/blocks/<id>`
- `DELETE /wp/v2/blocks/<id>`

### Categories

- `GET /wp/v2/categories`
- `POST /wp/v2/categories`
- `GET /wp/v2/categories/<id>`
- `POST /wp/v2/categories/<id>`
- `DELETE /wp/v2/categories/<id>`

### Comments

- `GET /wp/v2/comments`
- `POST /wp/v2/comments`
- `GET /wp/v2/comments/<id>`
- `POST /wp/v2/comments/<id>`
- `DELETE /wp/v2/comments/<id>`

### Media

- `GET /wp/v2/media`
- `POST /wp/v2/media`
- `GET /wp/v2/media/<id>`
- `POST /wp/v2/media/<id>`
- `DELETE /wp/v2/media/<id>`

### Menu locations

- `GET /wp/v2/menu-locations`
- `GET /wp/v2/menu-locations/<location>`

### Menu item revisions and autosaves

- `GET /wp/v2/menu-items/<id>/autosaves`
- `POST /wp/v2/menu-items/<id>/autosaves`
- `GET /wp/v2/menu-items/<parent>/autosaves/<id>`

### Menu items

- `GET /wp/v2/menu-items`
- `POST /wp/v2/menu-items`
- `GET /wp/v2/menu-items/<id>`
- `POST /wp/v2/menu-items/<id>`
- `DELETE /wp/v2/menu-items/<id>`

### Menus

- `GET /wp/v2/menus`
- `POST /wp/v2/menus`
- `GET /wp/v2/menus/<id>`
- `POST /wp/v2/menus/<id>`
- `DELETE /wp/v2/menus/<id>`

### Page revisions and autosaves

- `GET /wp/v2/pages/<id>/autosaves`
- `POST /wp/v2/pages/<id>/autosaves`
- `GET /wp/v2/pages/<parent>/autosaves/<id>`
- `GET /wp/v2/pages/<parent>/revisions`
- `GET /wp/v2/pages/<parent>/revisions/<id>`
- `DELETE /wp/v2/pages/<parent>/revisions/<id>`

### Pages

- `GET /wp/v2/pages`
- `POST /wp/v2/pages`
- `GET /wp/v2/pages/<id>`
- `POST /wp/v2/pages/<id>`
- `DELETE /wp/v2/pages/<id>`

### Pattern directory items

- `GET /wp/v2/pattern-directory/patterns`

### Plugins

- `GET /wp/v2/plugins`
- `POST /wp/v2/plugins`
- `GET /wp/v2/plugins/<plugin>`
- `POST /wp/v2/plugins/<plugin>`
- `DELETE /wp/v2/plugins/<plugin>`

### Post revisions and autosaves

- `GET /wp/v2/posts/<id>/autosaves`
- `POST /wp/v2/posts/<id>/autosaves`
- `GET /wp/v2/posts/<parent>/autosaves/<id>`
- `GET /wp/v2/posts/<parent>/revisions`
- `GET /wp/v2/posts/<parent>/revisions/<id>`
- `DELETE /wp/v2/posts/<parent>/revisions/<id>`

### Post statuses

- `GET /wp/v2/statuses`
- `GET /wp/v2/statuses/<status>`

### Post types

- `GET /wp/v2/types`
- `GET /wp/v2/types/<type>`

### Posts

- `GET /wp/v2/posts`
- `POST /wp/v2/posts`
- `GET /wp/v2/posts/<id>`
- `POST /wp/v2/posts/<id>`
- `DELETE /wp/v2/posts/<id>`

### Rendered blocks

- `POST /wp/v2/block-renderer/<name>`

### Search results

- `GET /wp/v2/search`

### Settings

- `GET /wp/v2/settings`
- `POST /wp/v2/settings`

### Sidebars

- `GET /wp/v2/sidebars`
- `GET /wp/v2/sidebars/<id>`
- `POST /wp/v2/sidebars/<id>`

### Tags

- `GET /wp/v2/tags`
- `POST /wp/v2/tags`
- `GET /wp/v2/tags/<id>`
- `POST /wp/v2/tags/<id>`
- `DELETE /wp/v2/tags/<id>`

### Taxonomies

- `GET /wp/v2/taxonomies`
- `GET /wp/v2/taxonomies/<taxonomy>`

### Themes

- `GET /wp/v2/themes`
- `GET /wp/v2/themes/<stylesheet>`

### Users

- `GET /wp/v2/users`
- `POST /wp/v2/users`
- `GET /wp/v2/users/<id>`
- `POST /wp/v2/users/<id>`
- `DELETE /wp/v2/users/<id>`
- `GET /wp/v2/users/me`
- `POST /wp/v2/users/me`
- `DELETE /wp/v2/users/me`

### Widget types

- `GET /wp/v2/widget-types`
- `GET /wp/v2/widget-types/<id>`

### Widgets

- `GET /wp/v2/widgets`
- `POST /wp/v2/widgets`
- `GET /wp/v2/widgets/<id>`
- `POST /wp/v2/widgets/<id>`
- `DELETE /wp/v2/widgets/<id>`

### Global style revisions

- `GET /wp/v2/global-styles/<parent>/revisions`

### Global styles

- `GET /wp/v2/global-styles/<id>`
- `POST /wp/v2/global-styles/<id>`

### Navigation revisions and autosaves

- `GET /wp/v2/navigation/<id>/autosaves`
- `POST /wp/v2/navigation/<id>/autosaves`
- `GET /wp/v2/navigation/<parent>/autosaves/<id>`
- `GET /wp/v2/navigation/<parent>/revisions`
- `GET /wp/v2/navigation/<parent>/revisions/<id>`
- `DELETE /wp/v2/navigation/<parent>/revisions/<id>`

### Navigations

- `GET /wp/v2/navigation`
- `POST /wp/v2/navigation`
- `GET /wp/v2/navigation/<id>`
- `POST /wp/v2/navigation/<id>`
- `DELETE /wp/v2/navigation/<id>`

### Template revisions and autosaves

- `GET /wp/v2/templates/<id>/autosaves`
- `POST /wp/v2/templates/<id>/autosaves`
- `GET /wp/v2/templates/<parent>/autosaves/<id>`
- `GET /wp/v2/templates/<parent>/revisions`
- `GET /wp/v2/templates/<parent>/revisions/<id>`
- `DELETE /wp/v2/templates/<parent>/revisions/<id>`

### Template part revisions and autosaves

- `GET /wp/v2/template-parts/<id>/autosaves`
- `POST /wp/v2/template-parts/<id>/autosaves`
- `GET /wp/v2/template-parts/<parent>/autosaves/<id>`
- `GET /wp/v2/template-parts/<parent>/revisions`
- `GET /wp/v2/template-parts/<parent>/revisions/<id>`
- `DELETE /wp/v2/template-parts/<parent>/revisions/<id>`

### Template parts

- `GET /wp/v2/template-parts`
- `POST /wp/v2/template-parts`
- `GET /wp/v2/template-parts/<id>`
- `POST /wp/v2/template-parts/<id>`
- `DELETE /wp/v2/template-parts/<id>`

### Templates

- `GET /wp/v2/templates`
- `POST /wp/v2/templates`
- `GET /wp/v2/templates/<id>`
- `POST /wp/v2/templates/<id>`
- `DELETE /wp/v2/templates/<id>`

## Notes

- Endpoint existence can vary by WordPress version.
- Authentication and permissions are enforced by WordPress and by installed plugins.
- Some endpoints are only available when block themes, editor features, widgets, menus, or plugin-specific features are active.
- For custom post types, use `wp.custom<TEntity>(restBase)`.
- For custom taxonomies, use `wp.terms(restBase)`.
- For plugin namespaces other than `wp/v2`, create a separate SDK instance with the `namespace` option or call `wp.client.request<T>()` directly.
