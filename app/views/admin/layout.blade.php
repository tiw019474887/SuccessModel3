<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="utf-8"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>

    <title>SuccessModel Control Panel</title>

    <link href="/components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="/css/dashboard.css" rel="stylesheet"/>

</head>

<body>
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="#">SuccessModel Control Panel</a>
</nav>

<div class="row">
    <div class="col-sm-3 col-md-2 sidebar">
        <ul class="nav nav-sidebar">
            <li class="{{Request::path() == 'admin' ? 'active' : '';}}"><a href="/admin">Dashboard</a></li>
            <li class="{{Request::path() == 'admin/faculty' ? 'active' : '';}}"><a href="/admin/faculty">Faculty</a></li>
        </ul>
    </div>

    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        @yield('application')
    </div>
</div>

    <script src="/components/jquery/dist/jquery.min.js"></script>
    <script src="/components/angular/angular.min.js"></script>
    <script src="/components/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script src="/components/angular-bootstrap/ui-bootstrap.min.js"></script>



    @yield('javascript')

</body>

</html>