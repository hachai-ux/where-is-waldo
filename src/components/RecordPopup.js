

const RecordPopup = (props) => {

    return (
        <div>
            <div class="form-popup" id="myForm">
                <form action="/action_page.php" class="form-container">
                    <h1>Time</h1>

                    <label for="name"><b>Name</b></label>
                    <input type="text" placeholder="Enter Name" name="name" required />

                    <button type="submit" class="btn">Save</button>
                </form>
            </div>
                        
        </div>
    )
}

export default RecordPopup;