
const videoFormats = [];

const onSubmit = (e) => {
    e.preventDefault();
};


const formSubmit = (e) => {
    e.preventDefault();
    //console.log(e.target.vidUrl.value);
    fetch('/video/formats', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vidUrl: e.target.vidUrl.value })
    }).then((res) => res.json())
        .then((json) => console.log(json));
}


const template = (
    <div>
        <form onSubmit={formSubmit}>
            <fieldset>
                <label htmlFor="vidUrl">Video URL:</label>
                <input type="text" name="vidUrl" id="vidUrl" />
            </fieldset>
            <fieldset>
                <label htmlFor="subUrl">Subtitle URL:</label>
                <input type="text" name="subUrl" id="subUrl" />
            </fieldset>
            <fieldset>
                <label htmlFor="vidFormat">Video Format: </label>

            </fieldset>
            <fieldset>
                <label htmlFor="subBrun">Burn Subtitles?</label>
                <input type="checkbox" name="subBurn" id="subBurn" />
            </fieldset>
            <input type="submit" value="Submit" id="submit" />
        </form>
    </div>
)
ReactDOM.render(template, document.getElementById('app'));
