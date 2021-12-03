import Copyright from './Copyright'

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            Welcome to The Top 5 Lister
            <br />
            <div id ="splash-screen-description">
                This web application is for user to list their five favorite <br />
                anything in our community as well as see lists made by <br />
                other users and leave the comments.
            </div>
            <div id ="splash-screen-description">
                You can through our community and found the see the<br />
                aggregate top 5 lists of all users for a given category.
            </div>
            <Copyright sx={{ mt: 5 }} />
        </div>
        
    )
}