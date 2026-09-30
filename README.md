# Dostępny sklep — quiz koncepcyjny

Polski, responsywny prototyp dla potencjalnych klientów Lizard Media. Niezależna propozycja; nie jest oficjalnym materiałem firmy ani audytem dostępności.

## Uruchomienie

Otwórz `index.html` w przeglądarce. Pliki index.html, styles.css, quiz.js i sciezka-zakupu.svg muszą pozostać w tym samym folderze. Brak instalacji, bibliotek, zewnętrznych fontów, analityki i zapisywania odpowiedzi.

## Publikacja na GitHub Pages

1. Utwórz publiczne repozytorium, np. `quiz-dostepnosci-ecommerce`.
2. Dodaj `index.html`, `styles.css`, `quiz.js`, `sciezka-zakupu.svg` i `README.md` do głównego katalogu repozytorium (nie do podfolderu).
3. Wejdź w Settings → Pages → Build and deployment.
4. Wybierz Deploy from a branch, gałąź `main` i folder `/ (root)`, następnie Save.
5. Po publikacji skopiuj adres pokazany w Pages. Typowy format: `https://NAZWA-UZYTKOWNIKA.github.io/quiz-dostepnosci-ecommerce/`.

## Mechanika

- 8 pytań, jedno na ekranie; brak automatycznego przejścia po zaznaczeniu.
- Wstecz i edycja odpowiedzi zachowują wybory; restart je usuwa.
- Tak: pozytywnie. Nie / Nie wiem: do sprawdzenia. Nie dotyczy: osobna grupa.
- Suma trzech grup zawsze wynosi 8. Bez procentu zgodności.
- Co najmniej jedno Nie: wariant możliwych barier. Brak Nie, ale Nie wiem: wariant weryfikacji. Pozostałe: dobry punkt wyjścia.
- Wynik widoczny przed formularzem; komentarz opcjonalny, maks. 500 znaków.

## Formularz

To świadomie oznaczona demonstracja. Waliduje e-mail i opcjonalny URL, ale niczego nie wysyła. Nie pokazuje fałszywego potwierdzenia wysłania. Wersja produkcyjna wymaga uzgodnionego odbiorcy, backendu lub usługi formularzy, informacji o przetwarzaniu danych, ochrony przed spamem, obsługi błędów sieci i prawdziwego potwierdzenia sukcesu. Nie umieszczaj kluczy API w HTML. Prośba o kontakt nie powinna automatycznie zapisywać do newslettera.

## Dostępność

Projekt uwzględnia WCAG 2.2 AA jako cel projektowy: semantyczne nagłówki, fieldset/legend, natywne radio, etykiety pól, widoczny fokus, link pomijający nagłówek, sterowanie klawiaturą, przenoszenie fokusu po zmianie ekranu, komunikaty błędów i statusów, duże cele dotykowe, elastyczny układ oraz preferencję ograniczonego ruchu. Nie jest to deklaracja pełnej zgodności ani wynik niezależnego audytu.

Przed użyciem produkcyjnym: testy NVDA/Firefox i VoiceOver/Safari (także iOS), klawiatura, powiększenie 200% i 400%, kontrast, tryb wysokiego kontrastu, automatyczny skaner oraz audyt pełnej ścieżki.

## Źródła

- https://www.gov.pl/web/dostepnosc-cyfrowa/polski-akt-o-dostepnosci--uslugi-handlu-elektronicznego
- https://www.gov.pl/web/dostepnosc-cyfrowa/obowiazki-informacyjne-w-pad
- https://eur-lex.europa.eu/eli/dir/2019/882/oj?locale=pl
- https://www.w3.org/WAI/WCAG22/quickref/

Treść wskazuje wybrane obszary dostępności. Wyłączenia prawne są deklarowane przez użytkownika, nie weryfikowane przez quiz.

## Zmiany w wersji 2

Numery pytań i opisowe statusy w wynikach, wyjaśnienie czytnika ekranu we wstępie, instrukcja klawiatury, nowe teksty pytań, placeholdery przy zachowanych etykietach, czerwona gwiazdka i ramka błędnego pola, nowa stopka. Tekst o odpowiedzi w 1 dzień roboczy jest koncepcyjny; formularz nadal jest demonstracyjny i nie wysyła danych.

## Odpowiedzi → wariant wyniku

| Odpowiedzi | Wariant |
| --- | --- |
| Co najmniej jedno Nie | Możliwe bariery |
| Brak Nie, co najmniej jedno Nie wiem | Weryfikacja |
| Pozostałe | Dobry punkt wyjścia |

Nie mamy takich treści (tylko pytanie 7) jest osobną kategorią. Pytanie 8 ma trzy odpowiedzi. Wynik zawiera pełne pytania. Przycisk edycji został usunięty. Historia przeglądarki zachowuje odpowiedzi podczas cofania między ekranami.

## Aktualne podsumowanie

Wyświetlane są dwie kategorie: ocenione pozytywnie i do sprawdzenia. Odpowiedź „Nie mamy takich treści” w pytaniu 7 pozostaje widoczna na liście odpowiedzi, ale nie zasila żadnego kafelka. Dlatego przy jej wyborze suma kafelków wynosi 7, a mianownik pozostaje 8 (liczba pytań). Tytuł karty i nazwa projektu: E-commerce bez barier.
