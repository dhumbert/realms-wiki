from functools import wraps
from realms import login_manager
from flask import current_app, request, flash, redirect
from flask.ext.login import login_url, current_user


@login_manager.unauthorized_handler
def unauthorized():
    if request.method == 'GET':
        flash('Please log in to access this page')
        return redirect(login_url('auth.login', request.url))
    else:
        return dict(error=True, message="Please log in for access."), 403


def check_view_access(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if current_app.login_manager._login_disabled:
            return func(*args, **kwargs)
        elif not current_app.config.get('ALLOW_ANON_VIEW') and not current_user.is_authenticated():
            return current_app.login_manager.unauthorized()
        return func(*args, **kwargs)
    return decorated_view


def check_edit_access(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if current_app.login_manager._login_disabled:
            return func(*args, **kwargs)
        elif not current_app.config.get('ALLOW_ANON_EDIT') and not current_user.is_authenticated():
            return current_app.login_manager.unauthorized()
        return func(*args, **kwargs)
    return decorated_view
