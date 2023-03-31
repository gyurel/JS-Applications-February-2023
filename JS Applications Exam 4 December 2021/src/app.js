import page from '../node_modules/page/page.mjs'
import { render } from '../node_modules/lit-html/lit-html.js'
import { getUserData } from './util.js';
import { layoutTemplate } from './views/layout.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './data/auth.js';
import { dashboardPage } from './views/dashboard.js';
import { addObjPage } from './views/addObj.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';

// TODO do not forget to import the app file into the index.html  !!!!!!!! <script src="/src/app.js" type="module"></script>
// TODO change render root depending on project HTML structure
const root = document.body;

//TODO change all links according to the requirements
page(contextRenderNextMiddleware);
page('index.html', '/');
page('/', homePage);
page('/crate/album', addObjPage);
page('/dashboard', dashboardPage);
page('/dashboard/:id', detailsPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);
page('/search', searchPage)

page.start();

function contextRenderNextMiddleware(ctx, next){
    ctx.render = renderView;


    next();
}

//TODO Inject dependencies 
function renderView(content){
    const userData = getUserData();
    render(layoutTemplate(userData, content), root);
}

function logoutAction(ctx){
    logout();
    ctx.page.redirect('/');
}