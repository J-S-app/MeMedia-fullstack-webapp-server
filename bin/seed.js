const mongoose = require('mongoose');
const User = require('../models/User.model');
const Post = require('../models/Post.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/js-web-app";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


const users = [
  { "email": "cpurcell0@phpbb.com", "username": "Crichton", "password": "daPlHo", "birthday": "9/6/2021", "country": "Brazil", "coverImage": "https://robohash.org/doloremconsequaturet.jpg?size=960x270&set=set1", "catchPhrase": "Enterprise-wide optimizing orchestration", "aboutMeme": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.", "profileImage": "https://robohash.org/liberofugiatid.jpg?size=50x50&set=set1" },
  { "email": "mishak1@bizjournals.com", "username": "Merrill", "password": "sTN14y", "birthday": "3/24/2022", "country": "Brazil", "coverImage": "https://robohash.org/odioveldolorem.jpg?size=960x270&set=set1", "catchPhrase": "Phased cohesive frame", "aboutMeme": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.", "profileImage": "https://robohash.org/quiatqueasperiores.jpg?size=50x50&set=set1" },
  { "email": "dboult2@ox.ac.uk", "username": "Diann", "password": "R62VtJ", "birthday": "6/16/2021", "country": "Sweden", "coverImage": "https://robohash.org/beataeautoccaecati.jpg?size=960x270&set=set1", "catchPhrase": "Customer-focused background methodology", "aboutMeme": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.", "profileImage": "https://robohash.org/omniscupiditatenon.jpg?size=50x50&set=set1" },
  { "email": "hpassy3@wikia.com", "username": "Haskell", "password": "DCC03U66XESe", "birthday": "1/5/2022", "country": "China", "coverImage": "https://robohash.org/nihildeseruntconsequatur.jpg?size=960x270&set=set1", "catchPhrase": "Assimilated tertiary contingency", "aboutMeme": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.", "profileImage": "https://robohash.org/veniamaperiamaccusantium.jpg?size=50x50&set=set1" },
  { "email": "avause4@yolasite.com", "username": "Alphonso", "password": "Ateo1oVAR", "birthday": "7/12/2021", "country": "Syria", "coverImage": "https://robohash.org/omnislaboreipsum.jpg?size=960x270&set=set1", "catchPhrase": "Cross-group national analyzer", "aboutMeme": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.", "profileImage": "https://robohash.org/delenitinemonumquam.jpg?size=50x50&set=set1" },
  { "email": "dwyss5@chicagotribune.com", "username": "Duffy", "password": "DIeGWn", "birthday": "1/26/2022", "country": "France", "coverImage": "https://robohash.org/voluptasnullamagnam.jpg?size=960x270&set=set1", "catchPhrase": "Reverse-engineered attitude-oriented groupware", "aboutMeme": "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.", "profileImage": "https://robohash.org/esseconsequunturquod.jpg?size=50x50&set=set1" },
  { "email": "elimerick6@china.com.cn", "username": "Elizabet", "password": "0F5jyMzBk", "birthday": "3/8/2022", "country": "Ethiopia", "coverImage": "https://robohash.org/eanonomnis.jpg?size=960x270&set=set1", "catchPhrase": "Multi-layered multimedia framework", "aboutMeme": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.", "profileImage": "https://robohash.org/nisireiciendisin.jpg?size=50x50&set=set1" },
  { "email": "sstit7@nasa.gov", "username": "Susanne", "password": "OD0vieoFjf6", "birthday": "3/1/2022", "country": "Poland", "coverImage": "https://robohash.org/quoseaqueut.jpg?size=960x270&set=set1", "catchPhrase": "Profit-focused explicit orchestration", "aboutMeme": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.", "profileImage": "https://robohash.org/officianatusquia.jpg?size=50x50&set=set1" },
  { "email": "mshalcros8@sphinn.com", "username": "Mollie", "password": "oCqke6Pt", "birthday": "4/3/2022", "country": "China", "coverImage": "https://robohash.org/veritatisetquas.jpg?size=960x270&set=set1", "catchPhrase": "Adaptive value-added local area network", "aboutMeme": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.", "profileImage": "https://robohash.org/cupiditateconsecteturmaiores.jpg?size=50x50&set=set1" },
  { "email": "mtwells9@google.com", "username": "Marven", "password": "CeovKfTgBI", "birthday": "6/29/2021", "country": "Argentina", "coverImage": "https://robohash.org/voluptatemlaboriosamrepellendus.jpg?size=960x270&set=set1", "catchPhrase": "Assimilated object-oriented implementation", "aboutMeme": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.", "profileImage": "https://robohash.org/quaeratipsumiste.jpg?size=50x50&set=set1" },
  { "email": "agabbidona@exblog.jp", "username": "Avis", "password": "bbMDfunys", "birthday": "9/15/2021", "country": "Russia", "coverImage": "https://robohash.org/eosnamlaborum.jpg?size=960x270&set=set1", "catchPhrase": "Right-sized background knowledge user", "aboutMeme": "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.", "profileImage": "https://robohash.org/quidemvoluptatumratione.jpg?size=50x50&set=set1" },
  { "email": "hbraysherb@google.co.uk", "username": "Henrie", "password": "uadDfg2", "birthday": "7/19/2021", "country": "Philippines", "coverImage": "https://robohash.org/exfacerelibero.jpg?size=960x270&set=set1", "catchPhrase": "Total hybrid knowledge base", "aboutMeme": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.", "profileImage": "https://robohash.org/possimusquivelit.jpg?size=50x50&set=set1" },
  { "email": "kgookesc@salon.com", "username": "Kissie", "password": "5kyf1bS4", "birthday": "3/20/2022", "country": "Portugal", "coverImage": "https://robohash.org/nisiperferendissint.jpg?size=960x270&set=set1", "catchPhrase": "Reverse-engineered discrete frame", "aboutMeme": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.", "profileImage": "https://robohash.org/voluptatesinvoluptatem.jpg?size=50x50&set=set1" },
  { "email": "cyounghusbandd@earthlink.net", "username": "Cassi", "password": "vrsCJShfOn", "birthday": "11/22/2021", "country": "Japan", "coverImage": "https://robohash.org/rerumsitcorporis.jpg?size=960x270&set=set1", "catchPhrase": "Progressive client-driven monitoring", "aboutMeme": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.", "profileImage": "https://robohash.org/commodiametet.jpg?size=50x50&set=set1" },
  { "email": "rodelle@marketwatch.com", "username": "Ruthe", "password": "j9aWXi2tF", "birthday": "7/26/2021", "country": "China", "coverImage": "https://robohash.org/autasperioresconsectetur.jpg?size=960x270&set=set1", "catchPhrase": "Open-architected scalable algorithm", "aboutMeme": "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.", "profileImage": "https://robohash.org/laboreadipiscinumquam.jpg?size=50x50&set=set1" },
  { "email": "rlavellef@vkontakte.ru", "username": "Ramsey", "password": "Yemz5DdLG", "birthday": "9/29/2021", "country": "Afghanistan", "coverImage": "https://robohash.org/illumipsamexplicabo.jpg?size=960x270&set=set1", "catchPhrase": "Optional user-facing groupware", "aboutMeme": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.", "profileImage": "https://robohash.org/omnisquiad.jpg?size=50x50&set=set1" },
  { "email": "bspeersg@ca.gov", "username": "Bruce", "password": "jkUiVkPxY1pY", "birthday": "7/19/2021", "country": "Libya", "coverImage": "https://robohash.org/possimusdignissimosid.jpg?size=960x270&set=set1", "catchPhrase": "Seamless client-server interface", "aboutMeme": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.", "profileImage": "https://robohash.org/voluptatemexmagni.jpg?size=50x50&set=set1" },
  { "email": "tosipenkoh@fastcompany.com", "username": "Tom", "password": "ZXrmEKJ", "birthday": "8/6/2021", "country": "Russia", "coverImage": "https://robohash.org/estprovidentasperiores.jpg?size=960x270&set=set1", "catchPhrase": "Managed local artificial intelligence", "aboutMeme": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.", "profileImage": "https://robohash.org/nobisdoloreveritatis.jpg?size=50x50&set=set1" },
  { "email": "kmaudetti@mapquest.com", "username": "Keary", "password": "Pav0DgGyU", "birthday": "5/6/2022", "country": "Macedonia", "coverImage": "https://robohash.org/eosperferendisrecusandae.jpg?size=960x270&set=set1", "catchPhrase": "Customer-focused 3rd generation internet solution", "aboutMeme": "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.", "profileImage": "https://robohash.org/commodinullaalias.jpg?size=50x50&set=set1" },
  { "email": "ewelberryj@va.gov", "username": "Emmi", "password": "myc2R8", "birthday": "2/3/2022", "country": "Philippines", "coverImage": "https://robohash.org/quiaautemqui.jpg?size=960x270&set=set1", "catchPhrase": "Open-source heuristic strategy", "aboutMeme": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.", "profileImage": "https://robohash.org/quidelenitiquo.jpg?size=50x50&set=set1" }
]

const posts = [
  { "title": "Duis mattis egestas metus.", "postContent": "https://robohash.org/similiquepossimusest.jpg?size=350x270&set=set1" },
  { "title": "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.", "postContent": "https://robohash.org/sapienteeavel.jpg?size=350x270&set=set1" },
  { "title": "Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.", "postContent": "https://robohash.org/inciduntnequeet.jpg?size=350x270&set=set1" },
  { "title": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.", "postContent": "https://robohash.org/autvoluptasquas.jpg?size=350x270&set=set1" },
  { "title": "Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum.", "postContent": "https://robohash.org/nesciuntutquibusdam.jpg?size=350x270&set=set1" },
  { "title": "Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus.", "postContent": "https://robohash.org/autemeligendiid.jpg?size=350x270&set=set1" },
  { "title": "Nam nulla.", "postContent": "https://robohash.org/idearumvoluptas.jpg?size=350x270&set=set1" },
  { "title": "Vivamus tortor.", "postContent": "https://robohash.org/excepturiexplicaboquia.jpg?size=350x270&set=set1" },
  { "title": "In hac habitasse platea dictumst. Etiam faucibus cursus urna.", "postContent": "https://robohash.org/totamvoluptatemodit.jpg?size=350x270&set=set1" },
  { "title": "Suspendisse potenti. Nullam porttitor lacus at turpis.", "postContent": "https://robohash.org/autemnihilperspiciatis.jpg?size=350x270&set=set1" },
  { "title": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.", "postContent": "https://robohash.org/quiperspiciatisconsequuntur.jpg?size=350x270&set=set1" },
  { "title": "Curabitur in libero ut massa volutpat convallis.", "postContent": "https://robohash.org/nullaexcepturiest.jpg?size=350x270&set=set1" },
  { "title": "Duis at velit eu est congue elementum. In hac habitasse platea dictumst.", "postContent": "https://robohash.org/reprehenderitaperiameius.jpg?size=350x270&set=set1" },
  { "title": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.", "postContent": "https://robohash.org/velitetsapiente.jpg?size=350x270&set=set1" },
  { "title": "Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.", "postContent": "https://robohash.org/estdoloresmodi.jpg?size=350x270&set=set1" },
  { "title": "Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.", "postContent": "https://robohash.org/doloribusutdebitis.jpg?size=350x270&set=set1" },
  { "title": "Curabitur gravida nisi at nibh.", "postContent": "https://robohash.org/praesentiumomnistenetur.jpg?size=350x270&set=set1" },
  { "title": "Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis.", "postContent": "https://robohash.org/veniamquivoluptatum.jpg?size=350x270&set=set1" },
  { "title": "Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.", "postContent": "https://robohash.org/quisevenietporro.jpg?size=350x270&set=set1" },
  { "title": "Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.", "postContent": "https://robohash.org/accusantiumquiaoptio.jpg?size=350x270&set=set1" },
  { "title": "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.", "postContent": "https://robohash.org/natusvoluptasquis.jpg?size=350x270&set=set1" },
  { "title": "Nunc rhoncus dui vel sem.", "postContent": "https://robohash.org/autemesterror.jpg?size=350x270&set=set1" },
  { "title": "Aliquam quis turpis eget elit sodales scelerisque.", "postContent": "https://robohash.org/occaecatiillumcorrupti.jpg?size=350x270&set=set1" },
  { "title": "Aliquam non mauris.", "postContent": "https://robohash.org/etdolorumneque.jpg?size=350x270&set=set1" },
  { "title": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.", "postContent": "https://robohash.org/suntaccusantiumnostrum.jpg?size=350x270&set=set1" },
  { "title": "Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.", "postContent": "https://robohash.org/voluptatumomnisnobis.jpg?size=350x270&set=set1" },
  { "title": "Vivamus tortor. Duis mattis egestas metus.", "postContent": "https://robohash.org/minusquasinihil.jpg?size=350x270&set=set1" },
  { "title": "Mauris sit amet eros.", "postContent": "https://robohash.org/quiculpanihil.jpg?size=350x270&set=set1" },
  { "title": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.", "postContent": "https://robohash.org/quisquamiurenam.jpg?size=350x270&set=set1" },
  { "title": "In quis justo. Maecenas rhoncus aliquam lacus.", "postContent": "https://robohash.org/hicfugitperspiciatis.jpg?size=350x270&set=set1" },
  { "title": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.", "postContent": "https://robohash.org/asperioressintqui.jpg?size=350x270&set=set1" },
  { "title": "Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.", "postContent": "https://robohash.org/ipsametperferendis.jpg?size=350x270&set=set1" },
  { "title": "Suspendisse accumsan tortor quis turpis. Sed ante.", "postContent": "https://robohash.org/eatotamsimilique.jpg?size=350x270&set=set1" },
  { "title": "Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.", "postContent": "https://robohash.org/facerecupiditatequae.jpg?size=350x270&set=set1" },
  { "title": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.", "postContent": "https://robohash.org/autharuminventore.jpg?size=350x270&set=set1" },
  { "title": "Praesent blandit.", "postContent": "https://robohash.org/culpasintfugiat.jpg?size=350x270&set=set1" },
  { "title": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.", "postContent": "https://robohash.org/voluptateestomnis.jpg?size=350x270&set=set1" },
  { "title": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.", "postContent": "https://robohash.org/voluptasoditminus.jpg?size=350x270&set=set1" },
  { "title": "Duis ac nibh.", "postContent": "https://robohash.org/sequiveroquidem.jpg?size=350x270&set=set1" },
  { "title": "Aliquam non mauris. Morbi non lectus.", "postContent": "https://robohash.org/nostrumfacerequi.jpg?size=350x270&set=set1" },
  { "title": "Sed accumsan felis. Ut at dolor quis odio consequat varius.", "postContent": "https://robohash.org/nemoestid.jpg?size=350x270&set=set1" },
  { "title": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis.", "postContent": "https://robohash.org/quosofficiisvoluptatum.jpg?size=350x270&set=set1" },
  { "title": "In hac habitasse platea dictumst.", "postContent": "https://robohash.org/estoptioculpa.jpg?size=350x270&set=set1" },
  { "title": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.", "postContent": "https://robohash.org/velautomnis.jpg?size=350x270&set=set1" },
  { "title": "Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst.", "postContent": "https://robohash.org/expeditateneturmaxime.jpg?size=350x270&set=set1" },
  { "title": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.", "postContent": "https://robohash.org/impeditpraesentiumunde.jpg?size=350x270&set=set1" },
  { "title": "Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.", "postContent": "https://robohash.org/impeditdoloremquis.jpg?size=350x270&set=set1" },
  { "title": "Nulla ut erat id mauris vulputate elementum.", "postContent": "https://robohash.org/quiaconsequaturdolor.jpg?size=350x270&set=set1" },
  { "title": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.", "postContent": "https://robohash.org/explicaboconsequaturperferendis.jpg?size=350x270&set=set1" },
  { "title": "Proin eu mi.", "postContent": "https://robohash.org/ipsumautiusto.jpg?size=350x270&set=set1" },
  { "title": "Praesent blandit.", "postContent": "https://robohash.org/errornonaliquam.jpg?size=350x270&set=set1" },
  { "title": "Cras non velit nec nisi vulputate nonummy.", "postContent": "https://robohash.org/etinrerum.jpg?size=350x270&set=set1" },
  { "title": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.", "postContent": "https://robohash.org/remprovidentvoluptatem.jpg?size=350x270&set=set1" },
  { "title": "Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.", "postContent": "https://robohash.org/repellatsedqui.jpg?size=350x270&set=set1" },
  { "title": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.", "postContent": "https://robohash.org/eavoluptatemeum.jpg?size=350x270&set=set1" },
  { "title": "Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.", "postContent": "https://robohash.org/ipsavoluptasculpa.jpg?size=350x270&set=set1" },
  { "title": "Vestibulum ac est lacinia nisi venenatis tristique.", "postContent": "https://robohash.org/doloresbeataeiusto.jpg?size=350x270&set=set1" },
  { "title": "In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.", "postContent": "https://robohash.org/illumveniamminus.jpg?size=350x270&set=set1" }
]

let userInfo;

User.create(users)
  .then(usersFromDB => {
    console.log(`Created ${usersFromDB.length} users`);
    // return Post.create(posts);
     userInfo = usersFromDB

    for (let i = 0; i<posts.length; i++){
      if(i<3){
        posts[i].postOwner = userInfo[0]._id
      } else if(i<6){
        posts[i].postOwner = userInfo[1]._id
      }else if(i<9){
        posts[i].postOwner = userInfo[2]._id
      }else if(i<12){
        posts[i].postOwner = userInfo[3]._id
      }else if(i<15){
        posts[i].postOwner = userInfo[4]._id
      }else if(i<18){
        posts[i].postOwner = userInfo[5]._id
      }else if(i<21){
        posts[i].postOwner = userInfo[6]._id
      }else if(i<24){
        posts[i].postOwner = userInfo[7]._id
      }else if(i<27){
        posts[i].postOwner = userInfo[8]._id
      }else if(i<30){
        posts[i].postOwner = userInfo[9]._id
      }else if(i<33){
        posts[i].postOwner = userInfo[10]._id
      }else if(i<36){
        posts[i].postOwner = userInfo[11]._id
      }else if(i<39){
        posts[i].postOwner = userInfo[12]._id
      }else if(i<42){
        posts[i].postOwner = userInfo[13]._id
      }else if(i<45){
        posts[i].postOwner = userInfo[14]._id
      }else if(i<48){
        posts[i].postOwner = userInfo[15]._id
      }else if(i<51){
        posts[i].postOwner = userInfo[16]._id
      }else if(i<54){
        posts[i].postOwner = userInfo[17]._id
      }else if(i<57){
        posts[i].postOwner = userInfo[18]._id
      }else{
        posts[i].postOwner = userInfo[19]._id
      }
    }
    return Post.create(posts);
  })
  .then(postsFromDB => {
    console.log(`Created ${postsFromDB.length} posts`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })

  .catch(err => console.log(`An error occurred seeding data in DB: ${err}`));