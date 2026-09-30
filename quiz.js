'use strict';
// Treść pytań i reguły wyniku są niezależne od renderowania.
const SCORE_GROUPS={
  yes:'positive',no:'review',unknown:'review',na:'notApplicable'
};
const RESULT_COPY={
  barriers:{
    title:'Warto przyjrzeć się dokładniej Twojej stronie',copy:'Twoje odpowiedzi wskazują na możliwe bariery w korzystaniu ze sklepu. Warto sprawdzić ich wpływ na zakupy, ustalić, czy potrzebne są zmiany i od czego zacząć.'
  },unknown:{
    title:'Warto sprawdzić to w praktyce',copy:'Są elementy, co do których nie wiesz, czy spełniają kryteria dostępności. „Nie wiem” nie oznacza błędu na stronie. Wskazuje, od czego warto zacząć sprawdzanie.'
  },positive:{
    title:'Dobry punkt wyjścia',copy:'Twoje odpowiedzi wskazują, że dbasz o obszary, o które pytaliśmy. Warto potwierdzić je w praktyce i sprawdzić pozostałe wymagania, szczególnie na całej ścieżce od wyboru produktu do płatności.'
  }
};
const questions=[
{
  name:'Zakupy bez myszy',text:'Czy klient może wybrać produkt, dodać go do koszyka i złożyć zamówienie, korzystając wyłącznie z klawiatury?',hint:'Podczas przechodzenia między przyciskami i polami powinno być widać, który element jest aktualnie aktywny.'
},
{
  name:'Czytelność strony',text:'Czy teksty, ceny i przyciski mają wystarczający kontrast względem tła?',hint:'Chodzi o to, czy są wyraźne także dla osób słabowidzących, a nie tylko estetyczne.'
},
{
  name:'Powiększenie tekstu',text:'Czy po powiększeniu tekstu w przeglądarce do 200% można przeczytać wszystkie informacje i korzystać ze sklepu?',hint:'Tekst nie powinien się ucinać ani zasłaniać przycisków i pól formularza.'
},
{
  name:'Zakupy z czytnikiem ekranu',text:'Czy z czytnikiem ekranu można wybrać produkt i przejść przez cały proces zakupu, łącznie z płatnością?',hint:'Czytnik ekranu odczytuje głosowo informacje i elementy strony. Korzystają z niego m.in. osoby niewidome.'
},
{
  name:'Komunikaty o błędach',text:'Czy przy niepoprawnym wypełnieniu formularza klient dostaje jasny komunikat, co poprawić i jak?',hint:'Na przykład: „Wpisz kod pocztowy w formacie 00-000”, zamiast samego czerwonego obramowania pola.'
},
{
  name:'Opisy obrazów',text:'Czy zdjęcia produktów mają teksty alternatywne opisujące zawartość zdjęcia?',hint:'Czytnik ekranu odczytuje te opisy. Sam opis „zdjęcie produktu” nie wystarczy — powinien przekazywać istotne informacje widoczne na obrazie.'
},
{
  name:'Kontrola nad ruchem',text:'Czy klient może zatrzymać automatycznie zmieniające się banery lub inne treści, które poruszają się dłużej niż 5 sekund?',hint:'Ruchome treści mogą utrudniać czytanie i skupienie uwagi.',na:'Nie mamy takich treści'
},
{
  name:'Informacje o dostępności',text:'Czy w regulaminie sklepu lub innym równoważnym dokumencie opisano, jak sklep spełnia wymagania dostępności?',hint:'Przedsiębiorcy objęci ustawą mają obowiązek udostępnić takie informacje w sposób dostępny dla klientów.'
}
];
const $=id=>document.getElementById(id);
let current=0;
let answers=Array(questions.length).fill(null);
const labels={
  yes:'Tak',no:'Nie',unknown:'Nie wiem'
};
let restoringHistory=false;
try{
  history.replaceState({
    quiz:true,screen:'intro',index:0
  },'')
}catch{
}
function screen(id){
  if(!restoringHistory){
    try{
      const state=history.state;
      if(!state?.quiz||state.screen!==id||state.index!==current)history.pushState({
        quiz:true,screen:id,index:current
      },'')
    }catch{
    }
  }for(const s of ['intro','quiz','result'])$(s).hidden=s!==id;
}
function render(){
  screen('quiz');
  const q=questions[current];
  $('step').textContent=`Pytanie ${current+1} z ${questions.length} · ${q.name}`;
  $('progress').replaceChildren(...questions.map((_,i)=>{
    const e=document.createElement('span');if(i<=current)e.className='done';return e
  }));
  $('question-title').replaceChildren();
  const prefix=document.createElement('span');
  prefix.className='sr-only';
  prefix.textContent=`Pytanie ${current+1} z ${questions.length}. `;
  $('question-title').append(prefix,document.createTextNode(q.text));
  $('question-hint').textContent=q.hint;
  $('question-field').setAttribute('aria-describedby','question-hint question-error');
  $('question-error').textContent='';
  $('options').replaceChildren();
  for(const [value,label] of [...Object.entries(labels),...(q.na?[['na',q.na]]:[])]){
    const wrapper=document.createElement('label');
    wrapper.className='option';
    const input=document.createElement('input');
    input.type='radio';
    input.name='answer';
    input.value=value;
    input.required=true;
    input.checked=answers[current]===value;
    input.addEventListener('change',()=>{
      answers[current]=value;$('question-error').textContent=''
    });
    const text=document.createElement('span');
    text.textContent=label;
    wrapper.append(input,text);
    $('options').append(wrapper)
  }$('next').textContent=current===questions.length-1?'Zobacz podsumowanie':'Dalej →';
  $('question-title').focus();
}
function result(){
  screen('result');
  const yes=answers.filter(a=>SCORE_GROUPS[a]==='positive').length;
  const no=answers.filter(a=>a==='no').length;
  const unknown=answers.filter(a=>a==='unknown').length;
  const na=answers.filter(a=>SCORE_GROUPS[a]==='notApplicable').length;
  $('positive').textContent = `${yes} z 8`;
  $('review').textContent = `${no+unknown} z 8`;

  const variant=no?'barriers':unknown?'unknown':'positive';
  $('result-title').textContent=RESULT_COPY[variant].title;
  $('result-copy').textContent=RESULT_COPY[variant].copy;
  $('all-answers').replaceChildren();
  questions.forEach((q, i) => {
    const row = document.createElement('li');
    const number = document.createElement('strong');
    number.className = 'answer-number';
    number.textContent = `${i + 1}.`;
    const question = document.createElement('span');
    question.className = 'answer-question';
    question.textContent = q.text;
    const status = document.createElement('span');
    status.className = 'answer-status';
    status.textContent = answers[i] === 'na' ? q.na : labels[answers[i]];
    row.append(number, question, status);
    $('all-answers').append(row);
  });
  $('result-title').focus();
}
window.addEventListener('popstate',e=>{
  if(!e.state?.quiz)return;restoringHistory=true;current=e.state.index;if(e.state.screen==='quiz')render();else if(e.state.screen==='result'&&answers.every(Boolean))result();else{
    screen('intro');$('intro-title').focus()
  }restoringHistory=false
});
$('start').addEventListener('click',render);
$('back').addEventListener('click',()=>{
  if(current>0){
    current--;render()
  }else{
    screen('intro');$('intro-title').focus()
  }
});
$('question-form').addEventListener('submit',e=>{
  e.preventDefault();if(!answers[current]){
    $('question-error').textContent='Wybierz odpowiedź. Jeśli nie masz pewności, wybierz „Nie wiem”.';$('options').querySelector('input').focus();return
  }if(current<questions.length-1){
    current++;render()
  }else result()
});
$('restart').addEventListener('click',()=>{
  answers.fill(null);current=0;$('contact-form').reset();$('contact-form').querySelector('button[type="submit"]').disabled=false;$('contact-form').querySelector('button[type="submit"]').textContent='Przetestuj prośbę o kontakt';clearContact();screen('intro');$('intro-title').focus()
});
function clearContact(){
  for(const id of ['email','shop']){
    $(id).removeAttribute('aria-invalid');
    $(id+'-error').textContent=''
  }$('contact-status').textContent='';
  $('contact-status').className=''
}
$('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  clearContact();
  const email = $('email');
  const shop = $('shop');
  email.value = email.value.trim();
  let first = null;
  if (!email.value || !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email.value) || !email.validity.valid) {
    email.setAttribute('aria-invalid', 'true');
    $('email-error').textContent = !email.value
    ? 'Podaj adres e-mail, żebyśmy mogli się z Tobą skontaktować.'
    : 'Sprawdź adres e-mail — powinien mieć format imie@firma.com.';
    first = email;
  }
  if (shop.value.trim()) {
    try {
      const raw = shop.value.trim();
      const url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(raw) ? raw : 'https://' + raw);
      if (!['https:', 'http:'].includes(url.protocol) || !url.hostname.includes('.') || url.username || url.password) throw new Error('Adres');
      shop.value = url.href;
    } catch {
      shop.setAttribute('aria-invalid', 'true');
      $('shop-error').textContent = 'Sprawdź adres sklepu — wpisz np. twojsklep.pl lub https://twojsklep.pl.';
      first ??= shop;
    }
  }
  if (first) {
    first.focus(); return;
  }
  $('contact-status').className = 'success';
  $('contact-status').textContent = 'To wersja demonstracyjna quizu. Dane nie zostały nigdzie zapisane.';
  const submit = $('contact-form').querySelector('button[type="submit"]');
  submit.disabled = true;
  submit.textContent = 'Formularz przetestowany';
});
$('contact-form').addEventListener('input', () => {
  const submit = $('contact-form').querySelector('button[type="submit"]');
  submit.disabled = false;
  submit.textContent = 'Przetestuj prośbę o kontakt';
  $('contact-status').textContent = '';
  $('contact-status').className = '';
});
