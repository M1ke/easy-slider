var easySlider={
	currentSlide:0
	,slides:1
	,width:0
	,opt:{
		el:'div.photo-slider'
		,elItem:'li'
		,elContainer:'ul'
		,interval:10000
		,noResize:false
	}
	,countSlides:function(){
		this.slides=$(this.opt.el).find(this.opt.elItem+':not(.hide)').length;
	}
	,next:function(){
		this.timer=setTimeout(function(self){
			return function(){
				self.slideShow();
			}
		}(this),this.opt.interval);
	}
	,reset:function(callback){
		this.stop();
		this.slides=$(this.opt.el).find(this.opt.elItem+':visible').length;
		this.currentSlide=0;
		this.slideNow();
		if (typeof callback=='function'){
			callback.call();
		}
		this.next();
	}
	,resize:function(){
		var $slider=$(this.opt.el);
		this.currentSlide=0;
		$slider.find(this.opt.elContainer+','+this.opt.elItem).css({width:'100%'});
		this.width=$slider.find(this.opt.elItem+':not(.hide):first').width();
		$slider.css({position:'relative'}).find(this.opt.elContainer).css({
			width:this.width*this.slides
			,position:'absolute',left:0
		}).end()
		.find(this.opt.elItem).css({width:this.width,float:'left'});
	}
	,setup:function(){
		this.width=$(this.opt.el).find(this.opt.elItem+':not(.hide):first').outerWidth();
	}
	,slide:function(slide){
		this.stop();
		this.currentSlide=slide;
		this.slideNow();
	}
	,slideNow:function(slide){
		slide=slide || this.currentSlide;
		$(this.opt.el).trigger('slide',slide).find(this.opt.elContainer).animate({left:-1*slide*this.width},500,'linear');
	}
	,slideShow:function(){
		this.currentSlide++;
		if (this.currentSlide>=this.slides){
			this.currentSlide=0;
		}
		this.slideNow()
		this.next();
	}
	,start:function(opt){
		this.opt=$.extend(this.opt,opt);
		this.countSlides();
		if (!this.opt.noResize){
			this.resize();
		}
		else {
			this.setup();
		}
		this.next();
		$(window).resize(function(self){
			return function(){
				self.resize();
			};
		}(this));
	}
	,stop:function(){
		clearTimeout(this.timer);
		this.timer=false;
	}
};