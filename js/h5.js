var H5 = function() {
    this.id  = ('h5_' + Math.random()).replace('.', '_');
    this.el = $('<div class="h5" id="' + this.id + '"></div>').hide();
    this.page = [];
    $('body').append(this.el);

/**
 *   新增一个页
 *   @param {string} name 组建的名称，会加入到classname中
 *   @param {string} text 页内的默认文本
 *   @return {H5} H5对象，可以重复使用H5对象支持的方法
 */
    this.addPage = function(name, text){
        var page = $('<div class="h5_page section"></div>');
        if(name != undefined) {
            page.addClass('h5_page' + name);
        }
        if(text != undefined) {
            page.text(text);
        }
        this.el.append(page);
        this.loader = function() {
            this.page[0].find('.h5_component').trigger('onLoad');
            this.el.show();
            this.el.fullpage({
                onLeave: function(index, nextIndex, direction) {
                    console.log(this);
                    console.log($(this));
                    $(this).find('.h5_component').trigger('onLeave');
                },
                afterLoad: function(anchorLink, index) {
                    $(this).find('.h5_component').trigger('onLoad');
                }
            });
        };
        this.page.push(page);
        return this;
    };
    this.addComponent = function(name, cfg) {
        var cfg = cfg || {};
        cfg = $.extend({
            type: 'base'
        }, cfg);
        var component;
        var page = this.page.slice(-1);
        switch (cfg.type) {
            case 'base':{
                component = new H5ComponentBase(name, cfg);
                break;
            }
        }
        page[0].append(component);
        return this;
    };
    return this;
};