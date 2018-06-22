#!/usr/bin/env node

const path  = require('path');
const fs    = require('fs');

const ignoreFilter = (function () {

    let ignore = path.resolve(__dirname, '.installgnore');

    ignore = fs.readFileSync(ignore).toString();

    ignore = ignore.split("\n");

    ignore = ignore.map(n => n.trim()).filter(n => n).filter(n => n.indexOf('#') !== 0);

    /**
     * https://www.npmjs.com/package/ignore v4.0.2
     * manually compressed
     */
    var ignoretool = function(){function e(e){return Array.isArray(e)?e:[e]}const t=/^\s+$/,r=/^\\!/,i=/^\\#/,s="/",n="undefined"!=typeof Symbol?Symbol.for("node-ignore"):"node-ignore",o=(e,t,r)=>Object.defineProperty(e,t,{value:r}),c=/([0-z])-([0-z])/g,a=[[/\\?\s+$/,e=>0===e.indexOf("\\")?" ":""],[/\\\s/g,()=>" "],[/[\\^$.|*+(){]/g,e=>`\\${e}`],[/\[([^\]/]*)($|\])/g,(e,t,r)=>"]"===r?`[${(e=>e.replace(c,(e,t,r)=>t.charCodeAt(0)<=r.charCodeAt(0)?e:""))(t)}]`:`\\${e}`],[/(?!\\)\?/g,()=>"[^/]"],[/^\//,()=>"^"],[/\//g,()=>"\\/"],[/^\^*\\\*\\\*\\\//,()=>"^(?:.*\\/)?"]],h=[[/^(?=[^^])/,function(){return/\/(?!$)/.test(this)?"^":"(?:^|\\/)"}],[/\\\/\\\*\\\*(?=\\\/|$)/g,(e,t,r)=>t+6<r.length?"(?:\\/[^\\/]+)*":"\\/.+"],[/(^|[^\\]+)\\\*(?=.+)/g,(e,t)=>`${t}[^\\/]*`],[/(\^|\\\/)?\\\*$/,(e,t)=>{return`${t?`${t}[^/]+`:"[^/]*"}(?=$|\\/$)`}],[/\\\\\\/g,()=>"\\"]],d=[...a,[/(?:[^*/])$/,e=>`${e}(?=$|\\/)`],...h],l=[...a,[/(?:[^*])$/,e=>`${e}(?=$|\\/$)`],...h],u={},_=e=>e&&"string"==typeof e&&!t.test(e)&&0!==e.indexOf("#"),f=(e,t)=>{const s=e;let n=!1;return 0===e.indexOf("!")&&(n=!0,e=e.substr(1)),{origin:s,pattern:e=e.replace(r,"!").replace(i,"#"),negative:n,regex:((e,t,r)=>{const i=u[e];if(i)return i;const s=(t?l:d).reduce((t,r)=>t.replace(r[0],r[1].bind(e)),e);return u[e]=r?new RegExp(s,"i"):new RegExp(s)})(e,n,t)}};class g{constructor({ignorecase:e=!0}={}){this._rules=[],this._ignorecase=e,o(this,n,!0),this._initCache()}_initCache(){this._cache={}}add(t){return this._added=!1,"string"==typeof t&&(t=t.split(/\r?\n/g)),e(t).forEach(this._addPattern,this),this._added&&this._initCache(),this}addPattern(e){return this.add(e)}_addPattern(e){if(e&&e[n])return this._rules=this._rules.concat(e._rules),void(this._added=!0);if(_(e)){const t=f(e,this._ignorecase);this._added=!0,this._rules.push(t)}}filter(t){return e(t).filter(e=>this._filter(e))}createFilter(){return e=>this._filter(e)}ignores(e){return!this._filter(e)}_filter(e,t){return!!e&&(e in this._cache?this._cache[e]:(t||(t=e.split(s)),t.pop(),this._cache[e]=t.length?this._filter(t.join(s)+s,t)&&this._test(e):this._test(e)))}_test(e){let t=0;return this._rules.forEach(r=>{t^r.negative||(t=r.negative^r.regex.test(e))}),!t}}if("undefined"!=typeof process&&(process.env&&process.env.IGNORE_TEST_WIN32||"win32"===process.platform)){const e=g.prototype._filter,t=e=>/^\\\\\?\\/.test(e)||/[^\x00-\x80]+/.test(e)?e:e.replace(/\\/g,"/");g.prototype._filter=function(r,i){return r=t(r),e.call(this,r,i)}}return e=>new g(e)}();

//     const ig = ignoretool().add(['*.js']);
//
// // to extract filtered list of paths
//     const filtered = ig.filter(paths)        // ['.abc/d/e.js']
//
//     console.log(filtered)
//
// // to check one path
//     const isfiltered = ig.ignores('.abc/a.js');
//
//     console.log(isfiltered ? 'true' : 'false');

    /*!
     * @version 1.0 - 2013-05-21
     * @author Szymon Działowski
     * direction : 'rl'|'r'|'l'   -->   (undefined => 'rl')
     * charlist  : (undefined => " \n")
     */
    function trim(string, charlist, direction) {
        direction = direction || 'rl';
        charlist  = (charlist || '').replace(/([.?*+^$[\]\\(){}|-])/g,'\\$1');
        charlist  = charlist || " \\n";
        (direction.indexOf('r')+1) && (string = string.replace(new RegExp('^(.*?)['+charlist+']*$','gm'),'$1'));
        (direction.indexOf('l')+1) && (string = string.replace(new RegExp('^['+charlist+']*(.*)$','gm'),'$1'));
        return string;
    }

    const ig = ignoretool().add(ignore);

    const len = __dirname.length;

    return file => {

        file = file.substring(len);

        file = trim(file, '\\/', 'l');

        let test;

        if (file) {
            test = !ig.ignores(file);
        }
        else {
            test = true;
        }

        const dump = {};

        dump[file] = test;

        // false - ignore file
        // true - copy file
        return test;
    }
}());


/**
 * https://github.com/AvianFlu/ncp
 */
function ncp (source, dest, options, callback) {
    var cback = callback;

    if (!callback) {
        cback = options;
        options = {};
    }

    var basePath = process.cwd(),
        currentPath = path.resolve(basePath, source),
        targetPath = path.resolve(basePath, dest),
        filter = options.filter,
        rename = options.rename,
        transform = options.transform,
        clobber = options.clobber !== false,
        modified = options.modified,
        dereference = options.dereference,
        errs = null,
        started = 0,
        finished = 0,
        running = 0,
        limit = options.limit || ncp.limit || 16;

    limit = (limit < 1) ? 1 : (limit > 512) ? 512 : limit;

    startCopy(currentPath);

    function startCopy(source) {
        started++;
        if (filter) {
            if (filter instanceof RegExp) {
                if (!filter.test(source)) {
                    return cb(true);
                }
            }
            else if (typeof filter === 'function') {
                if (!filter(source)) {
                    return cb(true);
                }
            }
        }
        return getStats(source);
    }

    function getStats(source) {
        var stat = dereference ? fs.stat : fs.lstat;
        if (running >= limit) {
            return setImmediate(function () {
                getStats(source);
            });
        }
        running++;
        stat(source, function (err, stats) {
            var item = {};
            if (err) {
                return onError(err);
            }

            // We need to get the mode from the stats object and preserve it.
            item.name = source;
            item.mode = stats.mode;
            item.mtime = stats.mtime; //modified time
            item.atime = stats.atime; //access time

            if (stats.isDirectory()) {
                return onDir(item);
            }
            else if (stats.isFile()) {
                return onFile(item);
            }
            else if (stats.isSymbolicLink()) {
                // Symlinks don't really need to know about the mode.
                return onLink(source);
            }
        });
    }

    function onFile(file) {
        var target = file.name.replace(currentPath, targetPath);
        if(rename) {
            target =  rename(target);
        }
        isWritable(target, function (writable) {
            if (writable) {
                return copyFile(file, target);
            }
            if(clobber) {
                rmFile(target, function () {
                    copyFile(file, target);
                });
            }
            if (modified) {
                var stat = dereference ? fs.stat : fs.lstat;
                stat(target, function(err, stats) {
                    //if souce modified time greater to target modified time copy file
                    if (file.mtime.getTime()>stats.mtime.getTime())
                        copyFile(file, target);
                    else return cb();
                });
            }
            else {
                return cb();
            }
        });
    }

    function copyFile(file, target) {
        var readStream = fs.createReadStream(file.name),
            writeStream = fs.createWriteStream(target, { mode: file.mode });

        readStream.on('error', onError);
        writeStream.on('error', onError);

        if(transform) {
            transform(readStream, writeStream, file);
        } else {
            writeStream.on('open', function() {
                readStream.pipe(writeStream);
            });
        }
        writeStream.once('finish', function() {
            if (modified) {
                //target file modified date sync.
                fs.utimesSync(target, file.atime, file.mtime);
                cb();
            }
            else cb();
        });
    }

    function rmFile(file, done) {
        fs.unlink(file, function (err) {
            if (err) {
                return onError(err);
            }
            return done();
        });
    }

    function onDir(dir) {
        var target = dir.name.replace(currentPath, targetPath);
        isWritable(target, function (writable) {
            if (writable) {
                return mkDir(dir, target);
            }
            copyDir(dir.name);
        });
    }

    function mkDir(dir, target) {
        fs.mkdir(target, dir.mode, function (err) {
            if (err) {
                return onError(err);
            }
            copyDir(dir.name);
        });
    }

    function copyDir(dir) {
        fs.readdir(dir, function (err, items) {
            if (err) {
                return onError(err);
            }
            items.forEach(function (item) {
                startCopy(path.join(dir, item));
            });
            return cb();
        });
    }

    function onLink(link) {
        var target = link.replace(currentPath, targetPath);
        fs.readlink(link, function (err, resolvedPath) {
            if (err) {
                return onError(err);
            }
            checkLink(resolvedPath, target);
        });
    }

    function checkLink(resolvedPath, target) {
        if (dereference) {
            resolvedPath = path.resolve(basePath, resolvedPath);
        }
        isWritable(target, function (writable) {
            if (writable) {
                return makeLink(resolvedPath, target);
            }
            fs.readlink(target, function (err, targetDest) {
                if (err) {
                    return onError(err);
                }
                if (dereference) {
                    targetDest = path.resolve(basePath, targetDest);
                }
                if (targetDest === resolvedPath) {
                    return cb();
                }
                return rmFile(target, function () {
                    makeLink(resolvedPath, target);
                });
            });
        });
    }

    function makeLink(linkPath, target) {
        fs.symlink(linkPath, target, function (err) {
            if (err) {
                return onError(err);
            }
            return cb();
        });
    }

    function isWritable(path, done) {
        fs.lstat(path, function (err) {
            if (err) {
                if (err.code === 'ENOENT') return done(true);
                return done(false);
            }
            return done(false);
        });
    }

    function onError(err) {
        if (options.stopOnError) {
            return cback(err);
        }
        else if (!errs && options.errs) {
            errs = fs.createWriteStream(options.errs);
        }
        else if (!errs) {
            errs = [];
        }
        if (typeof errs.write === 'undefined') {
            errs.push(err);
        }
        else {
            errs.write(err.stack + '\n\n');
        }
        return cb();
    }

    function cb(skipped) {
        if (!skipped) running--;
        finished++;
        if ((started === finished) && (running === 0)) {
            if (cback !== undefined ) {
                return errs ? cback(errs) : cback(null);
            }
        }
    }
}



/**
 * https://github.com/substack/node-mkdirp/blob/master/index.js
 */
var _0777 = parseInt('0777', 8);
function mkdirP (p, opts, f, made) {
    if (typeof opts === 'function') {
        f = opts;
        opts = {};
    }
    else if (!opts || typeof opts !== 'object') {
        opts = { mode: opts };
    }

    var mode = opts.mode;
    var xfs = opts.fs || fs;

    if (mode === undefined) {
        mode = _0777 & (~process.umask());
    }
    if (!made) made = null;

    var cb = f || function () {};
    p = path.resolve(p);

    xfs.mkdir(p, mode, function (er) {
        if (!er) {
            made = made || p;
            return cb(null, made);
        }
        switch (er.code) {
            case 'ENOENT':
                mkdirP(path.dirname(p), opts, function (er, made) {
                    if (er) cb(er, made);
                    else mkdirP(p, opts, cb, made);
                });
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                xfs.stat(p, function (er2, stat) {
                    // if the stat fails, then that's super weird.
                    // let the original error be the failure reason.
                    if (er2 || !stat.isDirectory()) cb(er, made)
                    else cb(null, made);
                });
                break;
        }
    });
}

mkdirP.sync = function sync (p, opts, made) {
    if (!opts || typeof opts !== 'object') {
        opts = { mode: opts };
    }

    var mode = opts.mode;
    var xfs = opts.fs || fs;

    if (mode === undefined) {
        mode = _0777 & (~process.umask());
    }
    if (!made) made = null;

    p = path.resolve(p);

    try {
        xfs.mkdirSync(p, mode);
        made = made || p;
    }
    catch (err0) {
        switch (err0.code) {
            case 'ENOENT' :
                made = sync(path.dirname(p), opts, made);
                sync(p, opts, made);
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                var stat;
                try {
                    stat = xfs.statSync(p);
                }
                catch (err1) {
                    throw err0;
                }
                if (!stat.isDirectory()) throw err0;
                break;
        }
    }

    return made;
};




// console.log(JSON.stringify({
//     'process.cwd()' : process.cwd(),
//     argv: process.argv,
//     __dirname_type: typeof __dirname,
//     __dirname_json: JSON.stringify(__dirname),
//     __filename_type: typeof __filename,
//     __filename_json: JSON.stringify(__filename),
// }, null, 4));
//
// {
//     "process.cwd()": "/Users/sd/Workspace/projects/bash-make-lifecycle/install-test", # where i executed "npx bash-make-lifecycle test"
//     "argv": [
//     "/usr/local/bin/node",
//     "/Users/sd/.npm/_npx/60150/bin/bash-make-lifecycle",
//     "test"
// ],
//     "__dirname_type": "string",
//     "__dirname_json": "\"/Users/sd/.npm/_npx/60150/lib/node_modules/bash-make-lifecycle\"", # where are all files temporary installed
//     "__filename_type": "string",
//     "__filename_json": "\"/Users/sd/.npm/_npx/60150/lib/node_modules/bash-make-lifecycle/install.js\""
// }

let target = ((process.argv[2] || '__bash-make-lifecycle') + '').trim();

if ( ! target ) {

    throw `\n\n    target is not specified, give it in first argument\n\n`;
}

target = path.resolve(process.cwd(), target);

const package = require(path.resolve(__dirname, 'package.json'));

console.log(`\n    Installing ${package.name}@${package.version}`);

mkdirP(target, err => {

    if (err) {

        return console.error(`mkdirP: ${err}`);
    }

    ncp(__dirname, target, {
        filter: file => {

            const copy = ignoreFilter(file);

            // console.log(JSON.stringify({
            //     file,
            //     copy
            // }, null, 4))

            return copy;
        }
    }, err => {

        if (err) {

            return console.error(`ncp: ${err}`);
        }

        process.stdout.write(`\n    Directory '${target}' has been created, enjoy 🍺\n\n`);

    });
});

