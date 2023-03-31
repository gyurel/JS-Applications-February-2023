import { html } from "../../node_modules/lit-html/lit-html.js";


// TODO Replace with actual layout
export const layoutTemplate = (userData, content) => html`
        <div id="box">
            <!--Navigation-->
            <header>
                <nav>
                    <img src="./images/headphones.png">
                    <a href="/">Home</a>
                    <ul>
                        <!--All user-->
                        <li><a href="/dashboard">Catalog</a></li>
                        <li><a href="/search">Search</a></li>
                        <!--Only guest-->
                        ${userData == null ? html`
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>`:
                        html`
                        <!--Only user-->
                        <li><a href="/crate/album">Create Album</a></li>
                        <li><a href="/logout">Logout</a></li>`}
                    </ul>
                </nav>
            </header>

            <main id="main-content">
                ${content}
            </main>

            <footer>
                <div>
                    &copy;SoftUni Team 2021. All rights reserved.
                </div>
            </footer>
        </div>`;
