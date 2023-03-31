import { html } from "../../node_modules/lit-html/lit-html.js";


// TODO Replace with actual layout
export const layoutTemplate = (userData, content) => html`
    <div id="wrapper">
        <header>
            <!-- Navigation -->
            <a id="logo" href="/"
                ><img id="logo-img" src="./images/logo.png" alt=""
            /></a>

            <nav>
                <div>
                <a href="/dashboard">Products</a>
                </div>

                <!-- Logged-in users -->
                
                ${userData ? 
                html`
                <div class="user">
                    <a href="/add/product">Add Product</a>
                    <a href="/logout">Logout</a>
                </div>` : 
                html`
                <div class="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>`}

                <!-- Guest users -->
                
            </nav>
        </header>

        <main>
            ${content}
        </main>
    </div>
    <footer>
      <p>@CosmeticKingdom</p>
    </footer>`;


// export const layoutTemplate = (userData, content) => html`
//     <header>
//         <nav>
//             <section class="logo">
//                 <img src="./images/logo.png" alt="logo">
//             </section>
//             <ul>
//                 <li><a href="/">Home</a></li>
//                 <li><a href="/dashboard">Dashboard</a></li>
//                 ${userData ? html`
//                 <li><a href="/create/postcard">Create Postcard</a></li>
//                 <li><a href="/logout">Logout</a></li>`:
//                 html`
//                 <li><a href="/login">Login</a></li>
//                 <li><a href="/register">Register</a></li>`}
//             </ul>
//         </nav>
//     </header>
//     <main id="content">
//         ${content}
//     </main>
//     <footer>Pet Care 2022©</footer>`;