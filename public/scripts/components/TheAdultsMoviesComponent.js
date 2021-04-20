import Header from "./TheHeaderComponent.js";
import Thumbnails from "./TheMoviesThumbsComponent.js";

export default {
    name: "AdultsMovies",

    template: `
    <section class="adultsMovies">

        <header-area :settings=settings :adults=adults :reachedhome=reachedhome @click="openMenu()" @pairData="getData" :whitelogo=whitelogo></header-area>
        
        <section class="highlightArea" @click=playVideo()>
            <iframe :src="highlight.movies_media+'?playlist='+this.playlist+'&autoplay=1&mute=1&loop=1&controls=0'" width="100%" height="800px" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <img src="images/play_media.svg" alt="Play" @click="playVideo()" v-if="!playvideo">
            <h3>Welcome again to Roku Movies Flashback<br>Watch the new releases of the week<br>And enjoy at home</h3>
        </section>

        <div v-if="playvideo" class="mediaBox">
                <button @click="closeVideo()"><img src="images/close.svg"></button>
                <iframe :src="highlight.movies_media+'?rel=0&autoplay=1'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
        </div>

        <!-- Filter fection -->
        <section class="filterSection">
                <div class="eraItem"><img src="images/login_background.jpg" alt="Filter Button" @click="seventies = false, eighties = false, nineties = false, getEra()"><span>SHOW ALL</span></div>
                <div class="eraItem"><img src="images/login_background.jpg" alt="Filter Button" @click="seventies = true, eighties = true, nineties = true, getEra()"><span>70s</span></div>
                <div class="eraItem"><img src="images/login_background.jpg" alt="Filter Button" @click="seventies = false, eighties = true, nineties = false, getEra()"><span>80s</span></div>
                <div class="eraItem"><img src="images/login_background.jpg" alt="Filter Button" @click="seventies = false, eighties = false, nineties = true, getEra()"><span>90s</span></div>
        </section>

        <section class="mediaArea">
            <div class="thumbnailsWrapper">
                <load-thumbnail v-for="movie in allmovies" :movie=movie :key=movie.movies_id :moviepage=moviepage></load-thumbnail>
            </div>
        </section>

    </section>
    `,

    data() {
        return {
            current: {},
            allmovies: [],
            highlight: {},
            playlist: "",
            seventies: false,
            eighties: false,
            nineties: false,
            url: `/api/adults/movies`,
            playvideo: false
        }
    },

    created: function () {
        this.moviepage = true;
        this.reachedhome = true;
        this.whitelogo = true;
        this.adults = true;
        this.settings = true;

        fetch(this.url)
            .then(res => res.json())
            .then(data => {
                this.allmovies = data;
                this.highlight = data[Math.floor(Math.random() * data.length)];
                this.playlist = this.highlight.movies_media.split("embed/").pop();
            })
            .catch((err) => console.error(err));

    },

    methods: {
        getData(data) {
            this.current = data;
        },

        getEra() {
            if (this.seventies == true) {
                this.url = `/api/adults/movies/70s`;

            } else if (this.eighties == true) {
                this.url = `/api/adults/movies/80s`;

            } else if (this.nineties == true) {
                this.url = `/api/adults/movies/90s`;
                
            } else {
                this.url = `/api/adults/movies`;
            }
            fetch(this.url)
                .then(res => res.json())
                .then(data => {
                    this.allmovies = data;
                })
                .catch((err) => console.error(err));
            this.$forceUpdate();
        },
        playVideo() {
            this.playvideo = true;
        },
        closeVideo() {
            this.playvideo = false;
        },
    },

    components: {
        "header-area": Header,
        "load-thumbnail": Thumbnails,
    }
}