/* SantaModel assists santa's helpers in packing children's requests.
 * It provides quality control by checking if the requests are being
 * fulfilled
 */

var SantaModel = {
    requests: null,
    current: null,
    i:0,
  
  /* Initializes the model with a list of requests, 
   * and sets the first one as the current one 
   */
   init : function(list){
       this.requests = requests;
       this.current = this.requests[0];
   },
  
   /* It moves "current" to the next request */
   next : function (){
       this.i++;
       if(this.i==this.requests.length){
           this.current = null;
       } else {
           this.current = this.requests[this.i];
       }
   },
  
   /* Returns the current request. 
    * If all requests have been processed (there is no current one), it returns null 
    */
   getCurrentRequest : function () {
       return this.current;
   },  
    
   /* Packs the given item if it fulfills the current request.       
    * returns 1 if the given item fulfills the request (= answer)
    * returns 0 if the given item does not fulfill the request
    */
   pack : function(item) {
       if(this.getCurrentRequest()!=null){
           if(this.getCurrentRequest().answer==item){
               return 1;
           } else {
               return 0;
           }
       }
   }      
  
};
var SantaOctopus = {
    count: 0,
    current: null,
    init: function(){
        SantaView.listen();
        SantaModel.init();
        this.newItem();
    },
    processAnswer: function(answer){
        if(SantaModel.pack(answer)==1){
            this.count++;
        }
        SantaModel.next();
        this.newItem();
    },
    newItem: function(){
        this.current = SantaModel.getCurrentRequest();
        if(this.current==null){
            SantaView.displayResult(this.count);
        } else {
            SantaView.display(this.current);
        }
    }
};
var SantaView = {
    display: function(request){
        $(".question").html(request.question);
        for(var i=0; i<request.options.length; i++){
            $(".question-items").append("<li class=\"item\" id=\"" +request.options[i]+"\">"+request.options[i]+"</li>");
        }
    },
    listen: function(){
        $(".question-items").on("click","li",function(){
            $(".question").html("");
            $(".question-items").html("");
            SantaOctopus.processAnswer($(this).attr('id'));
        });
    },
    displayResult: function(count){
        $(".result").html("Total points: "+count);
    }
};


$(document).ready(function(){
    SantaOctopus.init();    
});