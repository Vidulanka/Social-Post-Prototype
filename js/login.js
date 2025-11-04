document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('login-form');
  const user = document.getElementById('user');
  const password = document.getElementById('password');
  const userError = document.getElementById('user-error');
  const passError = document.getElementById('password-error');
  const message = document.getElementById('form-message');
  const toggle = document.getElementById('toggle-password');

  function validate(){
    let ok = true;
    userError.textContent = '';
    passError.textContent = '';

    const u = user.value.trim();
    if(!u){
      userError.textContent = 'Email or username is required';
      ok = false;
    } else if(u.length < 3){
      userError.textContent = 'Please enter at least 3 characters';
      ok = false;
    }

    const p = password.value;
    if(!p){
      passError.textContent = 'Password is required';
      ok = false;
    } else if(p.length < 6){
      passError.textContent = 'Password must be at least 6 characters';
      ok = false;
    }

    return ok;
  }

  toggle.addEventListener('click', function(){
    if(password.type === 'password'){
      password.type = 'text';
      toggle.textContent = 'Hide';
      toggle.setAttribute('aria-label','Hide password');
    } else {
      password.type = 'password';
      toggle.textContent = 'Show';
      toggle.setAttribute('aria-label','Show password');
    }
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    message.textContent = '';
    if(!validate()) return;

    // Simulate login request
    const submitBtn = document.getElementById('submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';

    setTimeout(() => {
      // Fake success: store a fake token
      sessionStorage.setItem('sp_token','fake-token-123');
      const remember = document.getElementById('remember').checked;
      if(remember){
        localStorage.setItem('sp_remember', user.value.trim());
      }

      message.style.color = 'green';
      message.textContent = 'Signed in successfully (simulated).';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign in';
    }, 800);
  });

});
