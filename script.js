const form = document.getElementById('form');
var ferieninput = document.getElementById('ferieninput');
var agbinput = document.getElementById('agbinput');
const sendBtn = document.getElementById('absendebutton');
const inputFieldvorname = document.getElementById('vornameInput');
const inputFielddestination = document.getElementById('vornameInput');
const inputFieldmail = document.getElementById('emailInput');
const inputFieldnachname = document.getElementById('nachnameinput');
const inputFieldgeschlecht = document.getElementById('inputFieldgeschlecht');
var geschlechtoption = document.getElementById('geschlecht');
var destinationoption = document.getElementById('destinationoption');
const fotoinput = document.getElementById('fotoinput');

function checkEmail(_inputFieldmail) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(_inputFieldmail.value.trim())) {
    console.log('E-Mail accept');
    document.getElementById('emailError').style.display = 'none';
    return true;
  } else {
    document.getElementById('emailError').style.display = 'block';
    console.log('no E-Mail');
  }
  return false;
}

function checkvorname(_inputFieldvorname) {
  let re = /^([a-zA-Z ]){2,30}$/;
  if (re.test(_inputFieldvorname.value.trim())) {
    console.log('name accept');
    document.getElementById('vornameError').style.display = 'none';
    return true;
  } else {
    console.log('no name');
    document.getElementById('vornameError').style.display = 'block';
  }
  return false;
}

function checknachname(_inputFieldnachname) {
  let re = /^([a-zA-Z ]){2,30}$/;
  if (re.test(inputFieldnachname.value.trim())) {
    console.log('surname accept');
    document.getElementById('nachnameError').style.display = 'none';
    return true;
  } else {
    document.getElementById('nachnameError').style.display = 'block';
    console.log('no surname');
  }
  return false;
}

function checkgeschlecht(_inputFieldgeschlecht) {

  if (geschlechtoption.value !== 'wählen') {
    console.log('selected');
    document.getElementById('geschlechtError').style.display = 'none';
    return true;
  } else {
    document.getElementById('geschlechtError').style.display = 'block';
    console.log('no gender');
  }
  return false;
}

function checkdestination(_inputFielddestination) {

  if (destinationoption.value < 1) {
    document.getElementById('destinationError').style.display = 'block';
    console.log('no destination');
    return false;
  } else {
    console.log('destination accept');
    document.getElementById('destinationError').style.display = 'none';
  }
  return true;
}

function checkferientext(_ferieninput) {

  if (ferieninput.value  !== '' ) {
    console.log('vacation text accept');
    document.getElementById('ferienError').style.display = 'none';
    return true;
  } else {
    document.getElementById('ferienError').style.display = 'block';
    console.log('no vacation text');
  }
  return false;
}

function checkagb(_agbinput) {

  if (agbinput.checked == false) {
    document.getElementById('agbError').style.display = 'block';
    console.log('agb not selected');
    return false;
  } else {
    console.log('agb selected');
    document.getElementById('agbError').style.display = 'none';
  }
  return true;

}

function checkfoto(_fotoinput) {

  if (document.getElementById("fotoinput").files.length == 0) {
    document.getElementById('fotoError').style.display = 'block';
    console.log('no upload');
    return false;
  } else {
    console.log('upload accept');
    document.getElementById('fotoError').style.display = 'none';
  }
  return true;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  validateForm();
});

sendBtn.addEventListener('click', function (e) {
  e.preventDefault();

  checknachname(inputFieldnachname);
  checkEmail(inputFieldmail);
  checkgeschlecht(inputFieldgeschlecht);
  checkdestination(inputFielddestination);
  checkferientext(ferieninput);
  checkagb(agbinput);
  checkfoto(fotoinput);
  alert('Vielen Dank für Ihre Teilnahme')

  if (checkvorname(inputFieldvorname) && checkEmail(inputFieldmail) && checknachname(inputFieldnachname) && checkgeschlecht(inputFieldgeschlecht) && checkdestination(inputFielddestination) && checkferientext(ferieninput) && checkagb(agbinput) && checkfoto(fotoinput)) {

    document.getElementById("formular").submit();
  }

});
