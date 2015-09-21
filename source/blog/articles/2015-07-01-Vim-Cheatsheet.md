---
title: Vim Cheatsheet
date: 2015-07-01
tags: Vim, Cheatsheet
---

I've really enjoyed integrating vim into my workflow and value learning
everything that it has to offer. As I continue to grow I will update
this to include helpful tips that don't warrant its own post.

READMORE

### Factory Settings

Start vim without your `vimrc` configurations. `-u NONE` stops vimrc from
loading and `-N` sets `nocampatible` option.

```vim;
$ vim -u NONE -N
```

### Insert Normal mode

You might be familiar with normal mode and insert mode at this point in your
vim career. Sometimes you just want to fire off one command and go back into
insert mode.

```vim
" You can turn this
<Esc>dwi

" Into this
<Ctl-o>dw
```

### Ranges

Many commands say they use ranges in `Ex` commands. You can create a range by
making it comma separated after pressing `:`. Documentation will often notate
it like `[range]` which means `:{start},{end}`. For example:

`:40,60` - Range from line 40 to line 60.  
`:/<body>/,/<\/body>/` - Range from the opening and closing of the body tag.

### Visual mode

`v`, `V`, and `<Ctrl-v>` put you into the three types of visual mode.

You can use `o` when in visual mode to change directions in your selection
without losing currently selected characters.

`gv` will visual select the last thing you had selected.

### Uppercase

You can change visually selected text to uppercase with `U`.

`gU` will make text uppercase from from normal mode.

### Indenting

I used to use `>>` to indent lines one step at a time but found something that
works better for me. Add this to your vimrc

```vim
filetype plugin indent on " smart indenting using ==
```

Vim can do some intelligent indenting now when pressing `==` on a line. It
knows based on file type and the content the correct indentation levels for
methods, classes, blocks, whatever. This works with motion commands as well so
you can use number keys to indent large sections of files.

##### Intending to end of file

```vim
>G
```

`>` indents and `G` signifies to do the action until the end of the file.

### Tabs

Tabs in vim are like tabs in most other programs. You can read help commands
for tab pages in the vim documentation:

```vim
:h tabp
```

* `gt` and `gT` will cycle through your open tabs.
* `:tab [filename]` will open a file in a new tab.

### Searching

`/` Searches the current buffer for first match and hitting `return` will find
all. You might need to escape some character

`n` Moves to each found term

#### Search under cursor

You can use `*` to search for the word under you cursor. `n` works the same
here.

### Math!

Vim can add or subtract values on the numbers. This works on numbers that the
cursor is positioned over. It also will move to the nearest numeric value if
not positioned over it eliminating the need for movement commands.

This will add 20 and subtract 90.
```vim
20<Ctrl-a>
90<Ctrl-x>
```

### Mapping

You can look at the list of actions that are mapped to keys by typing `:map`
with your matching pattern. For example, I can see what's mapped to
`<leader>c` by typing.

```vim
:map <leader>c
```

I've made a new mapping in my `.vimrc` and wondered why it was taking so long
to accept the command. Turns out it was waiting for more characters. This is
helpful because some commands might be mapped to plugins that you've included.
