---
title: Using Blocks in Ruby
date: 2015-11-30
tags: Ruby, Blocks, DSL
---

Today I was fortunate enough to be able to spend some time learning about the
intricacies of blocks in Ruby. I am hoping to ramp up from basic to more
complex ideas around blocks in this post so that all skill levels can benefit.

Blocks at first seem to be rather magical, and as a result, can be
intimidating to dive into. So take a deep breath if you are feeling similar
right now and believe that you will learn something new about blocks!

So if this is your first dive into blocks let's point one out.

```ruby
["Mon", "Tues", "Wednes"].each do |prefix| 
  puts "#{prefix}day"
end
```

The block in this chunk of code starts with `do` and ends with `end`. You've
likely seen this with curly braces as well (`{ |prefix| puts "#{prefix}day" }`).
What's happening is that each item in the array is being passed into the block
and the code inside is being executed. Let's make up our own method to see how we
would create and use our own block.

```ruby
def add_day
  yield "day"
end

add_day { |word| puts "Mon#{word}" }
add_day { |word| puts "What a wonderful #{word}" }
```

So there are a couple of wonderful things here. First is the keyword `yield`.
This keyword knows that an implicit block will be created and that it needs to
give whatever it's provided to that block. In the above example we `yield` the
string `"day"` to the block and use it to `puts` `"Monday"` for example.
Second is the term "implicit block". To better understand implicit, let's look
at the same example using an explicit block.

```ruby
def add_day &block
  block.call "day"
end

add_day { |word| puts "Mon#{word}" }
add_day { |word| puts "What a wonderful #{word}" }
```

When ran, this produces the same result. The difference is that when you use
the explicit `&block` syntax, a `Proc` object is being created for you so that
it will be able to respond to the `call` method with the argument `"day"`.
Some people will want you to understand this because there are performance
trade-offs when using explicit or implicit blocks.

Let's move towards something a little more real world. Perhaps we
have a need to take a collection of numbers and we wanted to be able to do
work on only those odd numbers. We don't know what the work would be, we just
want that work to only be with odd numbers values. We could write the following method
to help us out.

```ruby
class Array
  def each_odd_number
    self.each do |value|
      if value.respond_to?(:odd?) && value.odd?
        yield value
      end
    end
    return self
  end
end

[0,1,2,3,"foo",5,"bar"].each_odd_number do |odd_number|
  puts odd_number
end
```

We define the `each_odd_number` in the `Array` class so that every instance of
`Array` can now call it. We can make the logic as complex as we need it to be
and can use blocks to create new logic using the method. You can also see that
we call `return self` at the end of the method. we haven't made the
method "destructive" and it's common convention to return the original array
when it's not. If we didn't do this we would have `nil` returned.  Let's see
the same thing using the explicit block again.

```ruby
class Array
  def each_odd_number &some_block
    self.each do |value|
      if value.respond_to?(:odd?) && value.odd?
        some_block.call value
      end
    end
    return self
  end
end

[0,1,2,3,"foo",5,"bar"].each_odd_number do |odd_number|
  puts odd_number
end
```

Notice how I use `&some_block` as an argument for the method? It's common to
see this as `&block` or sometimes as `&b` in some projects, but it's really
just a name to identify the `Proc` object that's being created and it can be
whatever you want it to be. Other than that, it's identical to the implicit
syntax. Cool right!?

Let's keep going!

What if we didn't want that block to run right away? What if we want it to be
"saved" so we can call it again and again whenever we want? We can use
instance variables to save it and call the block whenever we want.

```ruby
class Robot
  def self.load_speech &block
    @speech = block
  end
end
```

We would then call `load_speech` like this

```ruby
Robot.load_speech do
  #whatever you want could go into here
  puts "Greetings."
  puts "You can call me Chip"
end
```

We now have the speech saved to the `Robot` singleton. Every time we call
`load_speech` and give it a block, it changes what the `@speech` variable is.

Let's create a way for the given block to be executed with a `give_speech`
class method.

```ruby
class Robot
  def self.load_speech &block
    @speech = block
  end

  def self.give_speech
    @speech.call
  end
end
```

Then when we call `Robot.give_speech` the block given to `load_speech` is
executed!

This is the beginnings of a new DSL for interacting with the Robot object.
It's basic but hopefully you are beginning to imagine some of the ways that
blocks can be used.

When I saw this I started wondering about some of the other ways I've seen
blocks implemented in ruby projects. Let's configure the robot before we start
interacting with it this time around. We will start be defining the DSL that
we want to be able to use to configure our `Robot`. After, we will define how
we want to interact with our robot object and those configurations.

```ruby
Robot.configure do |config|
  config.name = "Chip"
  config.set_greeting do |name|
    puts "Greetings."
    puts "you can call me #{name}."
  end
end

Robot.name
Robot.say_greeting
```

So in looking at this code we want to be able to configure what the name of
the robot is and how to create a greeting for the robot. Let's see how we
could implement this.

```ruby
class Robot
  def self.configure
    yield config
  end

  def self.config
    @config ||= RobotConfig.new
  end
end

class RobotConfig
  def name=(name)
    @name = name
  end

  def set_greeting &block
    @greeting = block
  end
end
```

Here we created an instance of `RobotConfig` that we memoize when the `config`
method is called. That object is yielded implicitly when `Robot.configure` is
called with a block. The `RobotConfig` object has a setter method for name and
a `set_greeting` method that stores a `Proc` in `@greeting`.

Next we want to start describing the `name` and `say_greeting` methods.

```ruby
class Robot
  def self.configure
    yield config
  end

  def self.config
    @config ||= RobotConfig.new
  end

  def self.name
    puts config.name
  end

  def self.say_greeting
    config.greeting.call config.name
  end
end

class RobotConfig
  attr_accessor :name

  def set_greeting &block
    @greeting = block
  end

  def greeting
    @greeting
  end
end
```

I updated the `name` method on the `RobotConfig` object to be an `attr_accessor` and then I am able to
pass it into the `call` method inside `say_greeting` so that it
is yielded correctly to the block that was defined in the `configure` method.

Hopefully through these examples blocks will be less intimidating to work
with. I found that as a learned more about how to use blocks, the less magical
frameworks and gems became.

