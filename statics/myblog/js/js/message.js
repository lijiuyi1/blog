const message = {
    template:
    `
    <div class="message row">
    <div class="col-md-3"></div>
    <div class="col-md-9 col-sm-12">
        <p>
            {{mymessage}}
        </p>
    </div> 
    </div>
    `,
    data() {
        return {
            // none:false
        }
    },
    props:['mymessage']
}
