# Online-Bookstore

Proiectul este realizat pentru cursul de Frontend avansat (Angular si React) 2022-2023, semestrul 1, anul 3, la Facultatea de Matematica si Informatica din cadrul Universitatii Bucuresti. 

Am ales sa folosesc Angular si sa mimez in acest proiect o librarie online.

## <i>Mod de utilizare:</i>
Userul poate sa navigheze prin cartile din baza de date si sa le filtreze dupa categorie si/sau author, sa vada detalii despre autori si despre cartile disponibile. Daca doreste sa introduca carti in cos, trebuie sa aiba/sa isi creeze un cont si sa se logheze. 
<br><br>
In cazul utilizatorului logat, acesta poata sa navigheze precum un user random, plus alte diverse optiuni: sa isi vada cartile din cos, sa introduca mai multe carti de acelasi tip, sa scada numarul lor, sa sterga toate cartile din cos, sa realizeze o comanda, sa vizualizeze toate comenzile realizate, sa se delogheze. 
<br><br>
Cele mai multe actiuni pot fi facute de pe un cont de admin. Doar el are posibilitatea sa creeze conturi de admin (si de user daca doreste). Pe langa tot ce poate sa faca un user, adminul poate sa introduca noi carti in librarie, sa modifice orice detaliu referitor la o carte, sa ii modifice autorul, sa o stearga, sa insereze noi categorii, sa insereze noi autori. 

<strong><i>Link catre youtube:</i></strong> [<i>click here</i>](https://www.youtube.com/watch?v=Q0AuPsbrTtw&ab_channel=DenisaPredescu)

## <i>Cerinte</i> (proiectul este realizat in angular):
- Sa aiba mai multe rute:
  - ruta principala: `['books']` care aprinde pagina de home in care se pot vedea toate cartile si se poate apasa pe diverse butoane pentru a merge in alte pagini (componente utilizate: HomeComponent, BookComponent, CategoryComponent, AuthorComponent)
  - `['auth']`: pagina contine 2 componente: LoginComponent si RegisterComponent. By default apare pagina de login, dar utilizatorul poate face switch la cealalta.
  - `['orders/{email}']`: utilizatorul vede toate comenzile realizate de el in trecut (ruta cu parametru)
  - `['basket/{email}']`: pagina in care ii este prezentat utilizatorului cosul curent (ruta cu parametru)
- Sa se foloseasca componente reutilizabile: `componenta reutilizabila folosita este BookComponent` care se foloseste o data pentru fiecare carte din librarie
- Sa se comunice intre componente: se folosesc toate cele 3 tipuri de comunicare
  - `@Input` si `@Output` pentru comunicarea dintre componenta parinte si componenta copil (si invers): sunt des folosite, intre fiecare componente parinte-copil este utilizata macar un tip de comunicare deoarece deseori se realizeara modificari care trebuie updatate. De exemplu, cand userul selecteaza ce caegorii doreste sa aiba cartile, componenta Home trebuie sa primeasca de la componenta copil Category categoriile selectate. In sens invers componenta category trebuie sa stie ce categorii a ales anterior utilizatrul ca sa faca checkboxul by default selectat in dreptul lor. 
  - `comunicarea prin serviciu (intre componente fara nicio legatura copil-parinte)`: este comunicat emailul utilizatorului intre componenta AuthComponent si componenta HomeComponent. Este nevoie in home sa se stie daca este un utilizator logat pentru a putea realiza diverse lucruri (functiona ruta de '\orders' si '\basket', avea voie sa adauge o carte in cos in componeta copil Book)
- Rute publice si private: <strong>`rutele publice sunt cele la care are access oricine, iar cele private sunt cele in care utilizatorul nu poate intra daca nu are cont (adica cele care restrictioneaza).`</strong> Exemplu de ruta publica este '/auth': oricine se poate authentifica. `Rutele private sunt create cu ajutorul unui Guard` si se concentreaza pe partea de Auth. Daca un utilizator random apasa pe butonul de Basket (pentru a-si vedea cosul) sau pe butonul de Orders (pentru a-si vedea comenzile precedente), aceaste rute nu ii sunt accesibile lui, asa ca este redirectionat catre pagina de autentificare. 
- Sa fie cel putin o pagina cu un form (login/register)
  - form login
  - form register
  - form add book
  - form update book
  - form add category
  - form update category
  - form add author
  - form update author
- Firebase sau orice alt mediu de backend: backendul este cel creat anul trecut la DAW (cu .NET), modificat pentru a-i aduce mai multa dificultate si pentru a se potrivi cu viziunea acestui frontend.
