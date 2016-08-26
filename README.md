# laravel-elixir-mail-processor
Take Foundation for emails 2 into Laravel.

## Inky
The main idea behind this package is to be able to use Inky in laravel's gulp process. You integrate simple Inky template markup in your blade file and it compiles down to a far more complex blade file full of tables and inline CSS in order to be compatible with most of the email clients.

Turn simple Inky markup like this :
```html
<container>
  <row>
    <columns>This is a column.</columns>
  </row>
</container>
```

Into this :
```html
<table class="container">
  <tbody>
    <tr>
      <td>
        <table class="row">
          <tbody>
            <tr>
              <th class="small-12 large-12 columns first last">
                <table>
                  <tr>
                    <th>This is a column.</th>
                    <th class="expander"></th>
                  </tr>
                </table>
              </th>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
```

## Install
```
npm install laravel-elixir-mail-processor --save-dev
```

Add plugin to your *gulpfile.js*

```javascript
const elixir = require('laravel-elixir');

require('laravel-elixir-vue');
require('laravel-elixir-mail-processor');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
    mix.sass('app.scss')
       .webpack('app.js')
       .processEmails();
});
```

Add an *emails* folder to your resources directory and create a file called *example.blade.php* with the following content :

```html
<style type="text/css">
  .header {
    background: #8a8a8a;
  }

  .header .columns {
    padding-bottom: 0;
  }

  .header p {
    color: #fff;
    padding-top: 15px;
  }

  .header .wrapper-inner {
    padding: 20px;
  }

  .header .container {
    background: transparent;
  }

  table.button.facebook table td {
    background: #3B5998 !important;
    border-color: #3B5998;
  }

  table.button.twitter table td {
    background: #1daced !important;
    border-color: #1daced;
  }

  table.button.google table td {
    background: #DB4A39 !important;
    border-color: #DB4A39;
  }

  .wrapper.secondary {
    background: #f3f3f3;
  }
</style>



<wrapper class="header">
  <container>
    <row class="collapse">
      <columns small="6">
        <img src="http://placehold.it/200x50/663399">
      </columns>
      <columns small="6">
        <p class="text-right">BASIC</p>
      </columns>
    </row>
  </container>
</wrapper>

<container>

  <spacer size="16"></spacer>

  <row>
    <columns small="12">

      <h1>Hi, Susan Calvin</h1>
      <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, iste, amet consequatur a veniam.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut optio nulla et, fugiat. Maiores accusantium nostrum asperiores provident, quam modi ex inventore dolores id aspernatur architecto odio minima perferendis, explicabo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quos quasi itaque beatae natus fugit provident delectus, magnam laudantium odio corrupti sit quam. Optio aut ut repudiandae velit distinctio asperiores?</p>
      <callout class="primary">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit repellendus natus, sint ea optio dignissimos asperiores inventore a molestiae dolorum placeat repellat excepturi mollitia ducimus unde doloremque ad, alias eos!</p>
      </callout>
    </columns>
  </row>
  <wrapper class="secondary">

    <spacer size="16"></spacer>

    <row>
      <columns large="6">
        <h5>Connect With Us:</h5>
        <button class="facebook expand" href="http://zurb.com">Facebook</button>
        <button class="twitter expand" href="http://zurb.com">Twitter</button>
        <button class="google expand" href="http://zurb.com">Google+</button>
      </columns>
      <columns large="6">
        <h5>Contact Info:</h5>
        <p>Phone: 408-341-0600</p>
        <p>Email: <a href="mailto:foundation@zurb.com">foundation@zurb.com</a></p>
      </columns>
    </row>
  </wrapper>
</container>
```

Run gulp. A *example.blade.php* file is generated in your resources/views/emails directory ! The code generated is very ugly, but that's what common email clients want ! To have an idea of what it will look like in the different most common mail clients, have a look at [the **Litmus** tests here](https://litmus.com/checklist/emails/public/eb690d2).

## Workflow
A watcher is included in the package so you can simply run ```gulp watch``` and make your changes in your resources/emails directory. You can include blade syntax in your files, it should work. You can have sub-directories.

## TODO
This package is very young and far from perfect. I've been struggling for a long time to find an easy way to send complex emails whitout being bothered by email HTML crap. This is the closest I can get but a few things could be added/enhenced :
- Add the possibility to add a CSS file to be compiled with
- have better gulp output (summary, source, destination when using Laravel 5.3)
- using this package with blade layouts is not ideal. I found ways to do it but it's a bit clunky. find a better way
- find people to help !

HAVE FUN !
