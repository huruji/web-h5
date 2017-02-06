/*散点图组件对象*/
var H5ComponentPoint = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    component.text('test');
    var base = cfg.data[0][1];      // 以第一个数据的比例大小为100%

    $.each(cfg.data, function(index, item) {
       var point = $('<div class="point point_' + index + '">');
       point.css({position:"absolute",'border-radius':'50%'});
       var name = $('<div class="name">' + item[0] + '</div>');
       var rate = $('<div class="name">' + (item[1]*100) +'%</div>');
       name.css({height: '30px',width:'100%',textAlign:'center',position: 'absolute',top: '50%',marginTop:'-15px',fontSize: "22px"})
       rate.css({fontSize:'0.5em'});
        name.append(rate);
       point.append(name);
       var per = (item[1] / base * 100) + '%';
       point.css({height:per,width:per});
       if(item[2]) {
           point.css({backgroundColor:item[2]});
       }
       if(item[3] !== undefined && item[4] !== undefined) {
           point.css({'left': item[3],'top': item[4]});
           point.data('left', item[3]).data('top', item[4]);
       }
       point.css({zIndex: 100-index, left:0,top:0,transition: 'all 1s' + index*0.5+'s'});
       component.append(point);
       component.on('onLoad', function() {
          component.find('.point').each(function(index, item) {
              $(item).css('left', $(item).data('left'));
          });
       });
        component.on('onLeave', function() {
            component.find('.point').each(function(index, item) {
                $(item).css('left', $(item).data('left'));
            });
        });
        component.find('.point').on('click', function(){
            component.find('.point').removeClass('.point_focus');
            $(this).addClass('point_focus');
            return false;
        }).eq(0).addClass('point_focus');
    });

    return component;
};
