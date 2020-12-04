# Departament_IT

Site-urile facute pentru proba practica de la departamentul de IT  Folderul Dep_IT_Basic contine doar pagina app.html si resursele necesare functionarii acestei, nu are backend, doar frontend care simuleaza backendul. 
Pagina este responsive, utilizatorul poate sa puna mai multe anunturi pentru teme, sau sa stearga dintre acestea, intotdeauna vor fi afisate cele mai noi 5 anunturi.
Datele nu persista la refresh. Datele, materiile si anunturile, sunt stocate in doua siruri din fisierul app.js.  



Folderul Dep_IT_Server contine resursele si partea de backend necesare rularii siteului. Backendul este scris in Node.js, in fisierul server.js. 
Am folosit AJAX pentru updata pagina in diferite momente, cand utilizatorul adauga un anunt sau cand sterge unul, ca utilizatorul sa nu fie nevoit sa reincarce intreaga pagina, doar partile necesare. 
De asemenea, formularul, dupa ce este completat, este trimis la adresa de gmail "testdepartament@gmail.com" cu parola "Test!234". Datele persista la refresh, dar se reseteaza la repornirea serverului, nu am reusit sa implementez o baza de date in timp util.  


URL pentru pagina dupa pornirea serverului va fi: "localhost:3000/"
