RyanHedges.com
==============

This is a [middlemann](http://middlemanapp.com/, "Middleman - static site generator") website that compiles into static web pages to be hosted on [github pages](https://pages.github.com/).

## Some tips for doing something similar yourself.

#### Building to master branch
Since this site is utilizing [Githubs user pages](https://help.github.com/articles/user-organization-and-project-pages/#user--organization-pages) I needed to find a way to work incrementally and only deploy my code when something was finished. The other aspect of this was that the static site gets exported into a [build directory](http://middlemanapp.com/basics/getting-started/)(bottom of page).

To accomplish this I did several things.

* [Changed your default branch](https://help.github.com/articles/setting-the-default-branch/) from `master` to a new development branch. I named mine `source`.

 ```git
$ git branch source
$ git push -u origin source
```

* In your `/Gemfile` add [middleman-deploy](https://github.com/karlfreeman/middleman-deploy). I decided on this one because it seems to be the most maintained over other gems as well as great documentation.

 ```ruby
# helps deploy to master branch
gem 'middleman-deploy', '~> 0.3.0'
```

* Configure your middleman-deploy gem by adding the `activate` block to your `config.rb` file. `.branch` will be set to `master` so that github pages will use those built files for displaying my website.


 ```ruby
activate :deploy do |deploy|
  deploy.method = :git
  deploy.branch = 'master'
  deploy.commit_message = 'initial build for middleman conversion'
end
```

 *Please note, I plan on changing the commit_message with most deploys as I'd like to make my builds descriptive. You can omit this if you want to have the [default message](https://github.com/karlfreeman/middleman-deploy#git-eg-github-pages) commit message made for you.*

##### How to build a new version of your site
It's rather simple to build the changes to your site thanks to the middleman-deploy gem. In your terminal type:

```
$ middleman deploy --build-before
```

I decided to use the `--build-before` option so that it's one step to essentially push my changes to my `master` branch.

### Contact

If you have any questions or comments you can reach me at:
ryan@ryanhedges.com
