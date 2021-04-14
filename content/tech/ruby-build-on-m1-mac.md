---
title: "Ruby-Build on an M1 Mac"
date: 2021-04-14T03:26:20Z
draft: false
tags:
  - tech
  - ruby
  - macos
---

I use [asdf-vm](http://asdf-vm.com) to manage runtime versions across different tools; I jump between environments often enough that I find this far easier and cleaner than tools like `rbenv`, `pyenv`, etc.

ASDF uses [`rbenv/ruby-build`](https://github.com/rbenv/ruby-build) to build Ruby versions:

    asdf install ruby 2.6.7

On a 2020 M1 mac, this failed for me like so:

    BUILD FAILED (macOS 11.2.3 using ruby-build 20210405)

    Inspect or clean up the working tree at /var/folders/c8/trsktyds3wvdg3rjg0zpmqkr0000gn/T/ruby-build.20210414132128.42715.DjmOfV
    Results logged to /var/folders/c8/trsktyds3wvdg3rjg0zpmqkr0000gn/T/ruby-build.20210414132128.42715.log

    Last 10 log lines:
    vm.c:2295:9: error: implicit declaration of function 'rb_native_mutex_destroy' is invalid in C99 [-Werror,-Wimplicit-function-declaration]
            rb_native_mutex_destroy(&vm->waitpid_lock);
            ^
    vm.c:2489:34: warning: expression does not compute the number of elements in this array; element type is 'const int', not 'VALUE' (aka 'unsigned long') [-Wsizeof-array-div]
                                sizeof(ec->machine.regs) / sizeof(VALUE));
                                        ~~~~~~~~~~~~~~~~  ^
    vm.c:2489:34: note: place parentheses around the 'sizeof(VALUE)' expression to silence this warning
    1 warning and 1 error generated.
    make: *** [vm.o] Error 1
    make: *** Waiting for unfinished jobs...


The fix was to pass these flags:

    RUBY_CFLAGS="-Wno-error=implicit-function-declaration" asdf install ruby 2.6.7

See here for some background:

https://github.com/rbenv/ruby-build/issues/1691
