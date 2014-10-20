RyanHedges.com
==============

This is a [middlemann](http://middlemanapp.com/, "Middleman - static site generator") website that compiles into static web pages to be hosted on [github pages](https://pages.github.com/).

## Some tips for doing something similar yourself.

#### Building to master branch
Since this site is utilizing [Githubs user pages](https://help.github.com/articles/user-organization-and-project-pages/#user--organization-pages) I needed to find a way to work incrementally and only deploy my code when something was finished. The other aspect of this was that the static site gets exported into a [build directory](http://middlemanapp.com/basics/getting-started/)(bottom of page).

To accomplish this I did several things.

* [Changed your default branch](https://help.github.com/articles/setting-the-default-branch/) from `master` to a new development branch. I named mine `source` and .

```git
git branch source
git push -u origin source
```

* In your `/Gemfile` add [middleman-deploy](https://github.com/karlfreeman/middleman-deploy).

```ruby
# helps deploy to master branch
gem 'middleman-deploy', '~> 0.3.0'
```

