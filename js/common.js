/**
 * Created by taguchimunetaka on 2015/11/17.
 */

var SYUKOU = SYUKOU || {};

SYUKOU.COMMON = {};

SYUKOU.COMMON.FIXSIDEBAR = {

	init : function(){
		this.setParameters();
		this.prepare();
		this.bindEvent();
	},
	setParameters : function(){
		this.$window = $(window);
		this.$sidebox = $('.jsc-sidebox');
	},
	prepare : function(){
		this.boxOffsetTop = this.$sidebox.offset().top
	},
	bindEvent : function(){
		this.$window.on('scroll', $.proxy(this.fixsidebox, this));
	},
	fixsidebox : function(){
		var windowTop = this.$window.scrollTop();

		if (windowTop > this.boxOffsetTop) {
			this.$sidebox.css({
				'position': 'fixed',
				'top': 0
			});
		}else{
			this.$sidebox.css({
				'position': 'relative',
				'top':''
			});
		}
	}
};



SYUKOU.COMMON.SIDESCROLL = {

	EASE_PARAMETER : 'swing',
	ANIMATE_SPEED : 1000,

	init : function(){
		this.setParameters();
		this.runEvent();
	},
	setParameters : function(){
		this.$window = $(window);
		this.$body = $('body,html');
		this.$targetLists = $('.jsc-side-list');
		this.$targetListsItem = this.$targetLists.find('li');
		this.$triggerList = this.$targetLists.find('li a');
	},
	runEvent : function(){
		var _self = this;

		this.$targetListsItem.each(function(){
			var $trigger = $(this).find('a');
			$trigger.on('click',function(e){
				e.preventDefault();

				if(_self.$body.is(':animated')){
					return;
				}

				_self.$triggerList.removeClass('current');
				$(this).addClass('current');

				var href= $(this).attr("href");
				var target = $(href == "#" || href == "" ? 'html' : href);
				var position = target.offset().top;
				_self.$body.animate({scrollTop:position}, _self.ANIMATE_SPEED, _self.EASE_PARAMETER);
			});
		})
	}
};



SYUKOU.COMMON.COMPLIANCE_SCROLL = {

	ADJUST_FADE_POSITION : 100,

	init : function(){
		this.setParameters();
		this.bindEvent();
	},
	setParameters : function(){
		this.$window = $(window);
		this.$htmlBody = $('html,body');
		this.$sidenav = $('.jsc-side-list');
		this.$sidenavList = this.$sidenav.find('li');
		this.$sidenavListTargets = this.$sidenavList.find('a');
	},
	bindEvent : function(){
		var _self = this;
		this.$sidenavListTargets.each(function(){
			var $myself = $(this),
				attrHref = $myself.attr('href'),
				$targetContent = $(attrHref),
				targetContentTop = $targetContent.offset().top;

			_self.$window.on('scroll',function(){
				if(_self.$htmlBody.is(':animated')){
					return;
				}

				if(_self.$window.scrollTop() > (targetContentTop - _self.ADJUST_FADE_POSITION)){
					_self.$sidenavListTargets.removeClass('current');
					$myself.addClass('current');
				}
			});
		});
	}
};




$(function(){
	SYUKOU.COMMON.FIXSIDEBAR.init();
	SYUKOU.COMMON.SIDESCROLL.init();
	SYUKOU.COMMON.COMPLIANCE_SCROLL.init();
});