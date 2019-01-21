/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "dc657c4db8e4dc801d42";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./app/app.jsx")(__webpack_require__.s = "./app/app.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/app.jsx":
/*!*********************!*\
  !*** ./app/app.jsx ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_react_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/react.js */ \"./src/react.js\");\n/* harmony import */ var _src_reactDOM_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/reactDOM.js */ \"./src/reactDOM.js\");\n\n // const MyCoolJSXQuoteComponent = ({quote, author}) => {\n//   return (\n//     <div className=\"quote-container\">\n//       <h4 className=\"quote\">\"{quote}\"</h4>\n//       <div className=\"author\">- {author}</div>\n//     </div>\n//   );\n// };\n//\n//\n// ReactDOM.render(\n//   <MyCoolJSXQuoteComponent\n//     quote=\"The only source of knowledge is experience.\"\n//     author=\"Albert Einstein\"/>,\n//   document.getElementById('root'));\n// TEST 1\n// const helloWorld = <div>hello sb!</div>;\n//\n// ReactDOM.render(helloWorld, document.getElementById('root'));\n// TEST 2\n// const helloWorld2 = <div style={{background: 'red'}}>\n//                         hello sb!\n//                         <div>\n//                             hello tony!\n//                         </div>\n//                     </div>;\n//\n// ReactDOM.render(helloWorld2, document.getElementById('root'));\n// TEST 3\n// class Hello extends React.Component{\n//     render() {\n//         return (\n//             <div>\n//                 Hello!!!\n//                 <span>\n//                     aaaaaa\n//                     <span>\n//                         vvvvvvvvvv\n//                     </span>\n//                 </span>\n//             </div>\n//         )\n//     }\n// }\n//\n// const helloWorld = (\n//     <div>\n//         ssssss\n//         <Hello/>\n//     </div>\n//     );\n// ReactDOM.render(helloWorld, document.getElementById('root'));\n// TEST 4\n\nclass Hello extends _src_react_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Component {\n  constructor(props) {\n    super(props);\n    this.state = {};\n  }\n\n  render() {\n    return _src_react_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"div\", null, \"Hello!!!\", this.props.children[0]);\n  }\n\n}\n\nconst helloWorld = _src_react_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"div\", null, \"ssssssw\", _src_react_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(Hello, null, _src_react_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"div\", null, \"Yang\")));\n_src_reactDOM_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].render(helloWorld, document.getElementById('root'));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvYXBwLmpzeD84YjRmIl0sIm5hbWVzIjpbIkhlbGxvIiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwic3RhdGUiLCJyZW5kZXIiLCJjaGlsZHJlbiIsImhlbGxvV29ybGQiLCJSZWFjdERPTSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0NBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQSxNQUFNQSxLQUFOLFNBQW9CQyxxREFBSyxDQUFDQyxTQUExQixDQUFtQztBQUMvQkMsYUFBVyxDQUFDQyxLQUFELEVBQVE7QUFDZixVQUFNQSxLQUFOO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDSDs7QUFFREMsUUFBTSxHQUFHO0FBQ0wsV0FDSSw2RkFHSyxLQUFLRixLQUFMLENBQVdHLFFBQVgsQ0FBb0IsQ0FBcEIsQ0FITCxDQURKO0FBT0g7O0FBZDhCOztBQWlCbkMsTUFBTUMsVUFBVSxHQUNaLDRGQUVJLG9FQUFDLEtBQUQsUUFDSSx3RkFESixDQUZKLENBREo7QUFRQUMsd0RBQVEsQ0FBQ0gsTUFBVCxDQUFnQkUsVUFBaEIsRUFBNEJFLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixNQUF4QixDQUE1QiIsImZpbGUiOiIuL2FwcC9hcHAuanN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJy4uL3NyYy9yZWFjdC5qcydcbmltcG9ydCBSZWFjdERPTSBmcm9tICcuLi9zcmMvcmVhY3RET00uanMnXG5cbi8vIGNvbnN0IE15Q29vbEpTWFF1b3RlQ29tcG9uZW50ID0gKHtxdW90ZSwgYXV0aG9yfSkgPT4ge1xuLy8gICByZXR1cm4gKFxuLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwicXVvdGUtY29udGFpbmVyXCI+XG4vLyAgICAgICA8aDQgY2xhc3NOYW1lPVwicXVvdGVcIj5cIntxdW90ZX1cIjwvaDQ+XG4vLyAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF1dGhvclwiPi0ge2F1dGhvcn08L2Rpdj5cbi8vICAgICA8L2Rpdj5cbi8vICAgKTtcbi8vIH07XG4vL1xuLy9cbi8vIFJlYWN0RE9NLnJlbmRlcihcbi8vICAgPE15Q29vbEpTWFF1b3RlQ29tcG9uZW50XG4vLyAgICAgcXVvdGU9XCJUaGUgb25seSBzb3VyY2Ugb2Yga25vd2xlZGdlIGlzIGV4cGVyaWVuY2UuXCJcbi8vICAgICBhdXRob3I9XCJBbGJlcnQgRWluc3RlaW5cIi8+LFxuLy8gICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcblxuLy8gVEVTVCAxXG4vLyBjb25zdCBoZWxsb1dvcmxkID0gPGRpdj5oZWxsbyBzYiE8L2Rpdj47XG4vL1xuLy8gUmVhY3RET00ucmVuZGVyKGhlbGxvV29ybGQsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xuXG4vLyBURVNUIDJcbi8vIGNvbnN0IGhlbGxvV29ybGQyID0gPGRpdiBzdHlsZT17e2JhY2tncm91bmQ6ICdyZWQnfX0+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBoZWxsbyBzYiFcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVsbG8gdG9ueSFcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICAgICAgICAgICAgICA8L2Rpdj47XG4vL1xuLy8gUmVhY3RET00ucmVuZGVyKGhlbGxvV29ybGQyLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcblxuLy8gVEVTVCAzXG4vLyBjbGFzcyBIZWxsbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbi8vICAgICByZW5kZXIoKSB7XG4vLyAgICAgICAgIHJldHVybiAoXG4vLyAgICAgICAgICAgICA8ZGl2PlxuLy8gICAgICAgICAgICAgICAgIEhlbGxvISEhXG4vLyAgICAgICAgICAgICAgICAgPHNwYW4+XG4vLyAgICAgICAgICAgICAgICAgICAgIGFhYWFhYVxuLy8gICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHZ2dnZ2dnZ2dnZcbi8vICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuLy8gICAgICAgICAgICAgICAgIDwvc3Bhbj5cbi8vICAgICAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICApXG4vLyAgICAgfVxuLy8gfVxuLy9cbi8vIGNvbnN0IGhlbGxvV29ybGQgPSAoXG4vLyAgICAgPGRpdj5cbi8vICAgICAgICAgc3Nzc3NzXG4vLyAgICAgICAgIDxIZWxsby8+XG4vLyAgICAgPC9kaXY+XG4vLyAgICAgKTtcbi8vIFJlYWN0RE9NLnJlbmRlcihoZWxsb1dvcmxkLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcblxuLy8gVEVTVCA0XG5jbGFzcyBIZWxsbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIEhlbGxvISEhXG4gICAgICAgICAgICAgICAgey8qIFRPRE86IGhvdyB0byBhdXRvbWF0aWNhbGx5IHJlbmRlciBhbGwgZWxlbXMgaW4gY2hpbGRyZW4gYXJyYXkgKi99XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW5bMF19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuY29uc3QgaGVsbG9Xb3JsZCA9IChcbiAgICA8ZGl2PlxuICAgICAgICBzc3Nzc3N3XG4gICAgICAgIDxIZWxsbz5cbiAgICAgICAgICAgIDxkaXY+WWFuZzwvZGl2PlxuICAgICAgICA8L0hlbGxvPlxuICAgIDwvZGl2PlxuICAgICk7XG5SZWFjdERPTS5yZW5kZXIoaGVsbG9Xb3JsZCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./app/app.jsx\n");

/***/ }),

/***/ "./src/react-utils.js":
/*!****************************!*\
  !*** ./src/react-utils.js ***!
  \****************************/
/*! exports provided: isClass, isFunc, isEvent, isClassName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isClass\", function() { return isClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isFunc\", function() { return isFunc; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isEvent\", function() { return isEvent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isClassName\", function() { return isClassName; });\nfunction isClass(func) {\n  // a hack way to check weather it is class or not\n  return typeof func === 'function' && /^class\\s/.test(Function.prototype.toString.call(func));\n}\n\nfunction isFunc(func) {\n  return typeof func === 'function' && !isClass(func);\n}\n\nfunction isEvent(name) {\n  return name.substring(0, 2) === 'on' ? true : false;\n}\n\nfunction isClassName(name) {\n  return name === 'className';\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtdXRpbHMuanM/MDAwNiJdLCJuYW1lcyI6WyJpc0NsYXNzIiwiZnVuYyIsInRlc3QiLCJGdW5jdGlvbiIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsImlzRnVuYyIsImlzRXZlbnQiLCJuYW1lIiwic3Vic3RyaW5nIiwiaXNDbGFzc05hbWUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFTQSxPQUFULENBQWlCQyxJQUFqQixFQUF1QjtBQUNuQjtBQUNBLFNBQU8sT0FBT0EsSUFBUCxLQUFnQixVQUFoQixJQUNBLFdBQVdDLElBQVgsQ0FBZ0JDLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkMsUUFBbkIsQ0FBNEJDLElBQTVCLENBQWlDTCxJQUFqQyxDQUFoQixDQURQO0FBRUg7O0FBRUQsU0FBU00sTUFBVCxDQUFnQk4sSUFBaEIsRUFBc0I7QUFDbEIsU0FBTyxPQUFPQSxJQUFQLEtBQWdCLFVBQWhCLElBQ0EsQ0FBQ0QsT0FBTyxDQUFDQyxJQUFELENBRGY7QUFFSDs7QUFFRCxTQUFTTyxPQUFULENBQWlCQyxJQUFqQixFQUF1QjtBQUNuQixTQUFPQSxJQUFJLENBQUNDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLE1BQXlCLElBQXpCLEdBQWdDLElBQWhDLEdBQXVDLEtBQTlDO0FBQ0g7O0FBRUQsU0FBU0MsV0FBVCxDQUFxQkYsSUFBckIsRUFBMkI7QUFDdkIsU0FBT0EsSUFBSSxLQUFLLFdBQWhCO0FBQ0giLCJmaWxlIjoiLi9zcmMvcmVhY3QtdXRpbHMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBpc0NsYXNzKGZ1bmMpIHtcbiAgICAvLyBhIGhhY2sgd2F5IHRvIGNoZWNrIHdlYXRoZXIgaXQgaXMgY2xhc3Mgb3Igbm90XG4gICAgcmV0dXJuIHR5cGVvZiBmdW5jID09PSAnZnVuY3Rpb24nXG4gICAgICAgICYmIC9eY2xhc3NcXHMvLnRlc3QoRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZnVuYykpO1xufVxuXG5mdW5jdGlvbiBpc0Z1bmMoZnVuYykge1xuICAgIHJldHVybiB0eXBlb2YgZnVuYyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAmJiAhaXNDbGFzcyhmdW5jKTtcbn1cblxuZnVuY3Rpb24gaXNFdmVudChuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUuc3Vic3RyaW5nKDAsIDIpID09PSAnb24nID8gdHJ1ZSA6IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc0NsYXNzTmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUgPT09ICdjbGFzc05hbWUnO1xufVxuXG5leHBvcnQge1xuICAgIGlzQ2xhc3MsXG4gICAgaXNGdW5jLFxuICAgIGlzRXZlbnQsXG4gICAgaXNDbGFzc05hbWUsXG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/react-utils.js\n");

/***/ }),

/***/ "./src/react.js":
/*!**********************!*\
  !*** ./src/react.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _react_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react-utils.js */ \"./src/react-utils.js\");\n\nlet rootDOMElement, rootReactElement;\nconst REACT_CLASS = 'REACT_CLASS';\nlet classCounter = 0;\nconst classMap = {};\n\nclass Vnode {\n  constructor(type, props, key, ref) {\n    this.type = type;\n    this.props = props;\n    this.key = key;\n    this.ref = ref;\n  }\n\n}\n\nclass Component {\n  constructor(props) {\n    this.props = props;\n    this.state = this.state || {};\n    this.nextState = null;\n  }\n\n  setState(partialState) {// TODO\n  }\n\n  render() {// TODO\n  }\n\n} // use createElement() create Vnode, extract info from params to Vnode, and build the Vtree\n\n\nfunction createElement(type, config, ...children) {\n  let props = {},\n      key = null,\n      ref = null;\n  props.children = children; //children is always an array\n  // parse config\n\n  if (config != null) {\n    // NOTE: undefined == null, return true, so check both undefined and null\n    key = config.key === undefined ? null : '' + config.key; // convert key to string or null\n\n    ref = config.ref === undefined ? null : config.ref; // then parse config to props\n\n    for (let propName in config) {\n      // make sure no key or ref in props\n      if (propName === 'key' || propName === 'ref') continue;\n\n      if (config.hasOwnProperty(propName)) {\n        props[propName] = config[propName];\n      }\n    }\n  } // add children to prop\n\n\n  if (children.length === 1) {\n    props.children = children[0];\n  } else {\n    props.children = children;\n  }\n\n  return new Vnode(type, props, key, ref);\n}\n/* NOTE: replace with virtual node*/\n// function createElement(el, props, ...children) {\n//     return anElement(el, props, children);\n// }\n\n\nfunction anElement(element, props, children) {\n  if (Object(_react_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"isClass\"])(element)) {\n    return handleClass(element, props, children);\n  } else if (Object(_react_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"isFunc\"])(element)) {\n    return element(props);\n  } else {\n    return handleDOMNode(element, props, children);\n  }\n}\n\nfunction handleClass(clazz, props, children) {\n  classCounter++;\n\n  if (classMap[classCounter]) {\n    return classMap[classCounter];\n  }\n\n  const reactElem = new clazz(props);\n  reactElem.children = children;\n  reactElem.type = REACT_CLASS;\n  classMap[classCounter] = reactElem; // NOTE: return the obj instead of calling render() here\n\n  return reactElem;\n}\n\nfunction handleDOMNode(element, props, children) {\n  const anElement = document.createElement(element);\n\n  if (children !== null) {\n    children.map(c => {\n      appendChild(anElement, c);\n    });\n  } // add event listeners or attributes from props\n\n\n  for (let propName in props) {\n    appendProp(anElement, propName, props[propName]);\n  }\n\n  return anElement;\n}\n\nfunction appendChild(element, child) {\n  if (child.type === 'REACT_CLASS') {\n    appendChild(element, child.render());\n  } else if (Array.isArray(child)) {\n    child.map(ch => {\n      element.appendChild(ch);\n    });\n  } else if (typeof child === 'object') {\n    element.appendChild(child);\n  } else {\n    element.innerHTML += child;\n  }\n}\n\nfunction appendProp(element, propName, propVal) {\n  if (Object(_react_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"isEvent\"])(propName)) {\n    element.addEventListener(propName.substring(2).toLowerCase(), propVal);\n  } else if (Object(_react_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"isClassName\"])(propName)) {\n    propName = 'class';\n    element.setAttribute(propName, propVal);\n  } else {\n    element.setAttribute(propName, propVal);\n  }\n} // class Component {\n//     constructor(props) {\n//         this.props = props;\n//     }\n//     setState (state) {\n//         this.state = Object.assign({}, this.state, state);\n//         reRender();\n//     }\n// }\n\n\nfunction reRender() {\n  // delete old dom tree\n  while (rootDOMElement.hasChildNodes()) {\n    rootDOMElement.removeChild(rootDOMElement.lastChild);\n  } // render again\n\n\n  classCounter = 1; // skip the root\n\n  ReactDOM.render(rootReactElement, rootDOMElement);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  createElement,\n  Component\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QuanM/Nzc3ZCJdLCJuYW1lcyI6WyJyb290RE9NRWxlbWVudCIsInJvb3RSZWFjdEVsZW1lbnQiLCJSRUFDVF9DTEFTUyIsImNsYXNzQ291bnRlciIsImNsYXNzTWFwIiwiVm5vZGUiLCJjb25zdHJ1Y3RvciIsInR5cGUiLCJwcm9wcyIsImtleSIsInJlZiIsIkNvbXBvbmVudCIsInN0YXRlIiwibmV4dFN0YXRlIiwic2V0U3RhdGUiLCJwYXJ0aWFsU3RhdGUiLCJyZW5kZXIiLCJjcmVhdGVFbGVtZW50IiwiY29uZmlnIiwiY2hpbGRyZW4iLCJ1bmRlZmluZWQiLCJwcm9wTmFtZSIsImhhc093blByb3BlcnR5IiwibGVuZ3RoIiwiYW5FbGVtZW50IiwiZWxlbWVudCIsImlzQ2xhc3MiLCJoYW5kbGVDbGFzcyIsImlzRnVuYyIsImhhbmRsZURPTU5vZGUiLCJjbGF6eiIsInJlYWN0RWxlbSIsImRvY3VtZW50IiwibWFwIiwiYyIsImFwcGVuZENoaWxkIiwiYXBwZW5kUHJvcCIsImNoaWxkIiwiQXJyYXkiLCJpc0FycmF5IiwiY2giLCJpbm5lckhUTUwiLCJwcm9wVmFsIiwiaXNFdmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdWJzdHJpbmciLCJ0b0xvd2VyQ2FzZSIsImlzQ2xhc3NOYW1lIiwic2V0QXR0cmlidXRlIiwicmVSZW5kZXIiLCJoYXNDaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJsYXN0Q2hpbGQiLCJSZWFjdERPTSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBRUEsSUFBSUEsY0FBSixFQUFvQkMsZ0JBQXBCO0FBQ0EsTUFBTUMsV0FBVyxHQUFHLGFBQXBCO0FBRUEsSUFBSUMsWUFBWSxHQUFHLENBQW5CO0FBQ0EsTUFBTUMsUUFBUSxHQUFHLEVBQWpCOztBQUVBLE1BQU1DLEtBQU4sQ0FBWTtBQUNSQyxhQUFXLENBQUNDLElBQUQsRUFBT0MsS0FBUCxFQUFjQyxHQUFkLEVBQW1CQyxHQUFu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QixRQUFyQixFQUE4QjtBQUMvQlosV0FBTyxDQUFDVSxXQUFSLENBQW9CRSxLQUFwQjtBQUNILEdBRkksTUFHQTtBQUNEWixXQUFPLENBQUNnQixTQUFSLElBQXFCSixLQUFyQjtBQUNIO0FBQ0o7O0FBRUQsU0FBU0QsVUFBVCxDQUFvQlgsT0FBcEIsRUFBNkJKLFFBQTdCLEVBQXVDcUIsT0FBdkMsRUFBZ0Q7QUFDNUMsTUFBSUMsK0RBQU8sQ0FBQ3RCLFFBQUQsQ0FBWCxFQUF1QjtBQUNuQkksV0FBTyxDQUFDbUIsZ0JBQVIsQ0FBeUJ2QixRQUFRLENBQUN3QixTQUFULENBQW1CLENBQW5CLEVBQXNCQyxXQUF0QixFQUF6QixFQUE4REosT0FBOUQ7QUFDSCxHQUZELE1BR0ssSUFBSUssbUVBQVcsQ0FBQzFCLFFBQUQsQ0FBZixFQUEyQjtBQUM1QkEsWUFBUSxHQUFHLE9BQVg7QUFDQUksV0FBTyxDQUFDdUIsWUFBUixDQUFxQjNCLFFBQXJCLEVBQStCcUIsT0FBL0I7QUFDSCxHQUhJLE1BSUE7QUFDRGpCLFdBQU8sQ0FBQ3VCLFlBQVIsQ0FBcUIzQixRQUFyQixFQUErQnFCLE9BQS9CO0FBQ0g7QUFDSixDLENBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxTQUFTTyxRQUFULEdBQW9CO0FBQ2hCO0FBQ0EsU0FBTWpELGNBQWMsQ0FBQ2tELGFBQWYsRUFBTixFQUFzQztBQUNsQ2xELGtCQUFjLENBQUNtRCxXQUFmLENBQTJCbkQsY0FBYyxDQUFDb0QsU0FBMUM7QUFDSCxHQUplLENBS2hCOzs7QUFDQWpELGNBQVksR0FBRyxDQUFmLENBTmdCLENBTUU7O0FBQ2xCa0QsVUFBUSxDQUFDckMsTUFBVCxDQUFnQmYsZ0JBQWhCLEVBQWtDRCxjQUFsQztBQUNIOztBQUVjO0FBQ1hpQixlQURXO0FBRVhOO0FBRlcsQ0FBZiIsImZpbGUiOiIuL3NyYy9yZWFjdC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzQ2xhc3MsIGlzRnVuYywgaXNFdmVudCwgaXNDbGFzc05hbWV9IGZyb20gJy4vcmVhY3QtdXRpbHMuanMnO1xuXG5sZXQgcm9vdERPTUVsZW1lbnQsIHJvb3RSZWFjdEVsZW1lbnQ7XG5jb25zdCBSRUFDVF9DTEFTUyA9ICdSRUFDVF9DTEFTUyc7XG5cbmxldCBjbGFzc0NvdW50ZXIgPSAwO1xuY29uc3QgY2xhc3NNYXAgPSB7fTtcblxuY2xhc3MgVm5vZGUge1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIHByb3BzLCBrZXksIHJlZikge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnJlZiA9IHJlZjtcbiAgICB9XG59XG5cbmNsYXNzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZSB8fCB7fVxuXG4gICAgICAgIHRoaXMubmV4dFN0YXRlID0gbnVsbFxuICAgIH1cblxuICAgIHNldFN0YXRlKHBhcnRpYWxTdGF0ZSkge1xuICAgICAgICAvLyBUT0RPXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICAvLyBUT0RPXG4gICAgfVxufVxuXG4vLyB1c2UgY3JlYXRlRWxlbWVudCgpIGNyZWF0ZSBWbm9kZSwgZXh0cmFjdCBpbmZvIGZyb20gcGFyYW1zIHRvIFZub2RlLCBhbmQgYnVpbGQgdGhlIFZ0cmVlXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIGNvbmZpZywgLi4uY2hpbGRyZW4pIHtcbiAgICBsZXQgcHJvcHMgPSB7fSxcbiAgICAgICAga2V5ID0gbnVsbCxcbiAgICAgICAgcmVmID0gbnVsbDtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuOyAgLy9jaGlsZHJlbiBpcyBhbHdheXMgYW4gYXJyYXlcblxuICAgIC8vIHBhcnNlIGNvbmZpZ1xuICAgIGlmIChjb25maWcgIT0gbnVsbCkgeyAgLy8gTk9URTogdW5kZWZpbmVkID09IG51bGwsIHJldHVybiB0cnVlLCBzbyBjaGVjayBib3RoIHVuZGVmaW5lZCBhbmQgbnVsbFxuICAgICAgICBrZXkgPSBjb25maWcua2V5ID09PSB1bmRlZmluZWQgPyBudWxsIDogJycgKyBjb25maWcua2V5OyAvLyBjb252ZXJ0IGtleSB0byBzdHJpbmcgb3IgbnVsbFxuICAgICAgICByZWYgPSBjb25maWcucmVmID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLnJlZjtcbiAgICAgICAgLy8gdGhlbiBwYXJzZSBjb25maWcgdG8gcHJvcHNcbiAgICAgICAgZm9yIChsZXQgcHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgbm8ga2V5IG9yIHJlZiBpbiBwcm9wc1xuICAgICAgICAgICAgaWYgKHByb3BOYW1lID09PSAna2V5JyB8fCBwcm9wTmFtZSA9PT0gJ3JlZicpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCBjaGlsZHJlbiB0byBwcm9wXG4gICAgaWYoIGNoaWxkcmVuLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW5bMF07XG4gICAgfWVsc2V7XG4gICAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgfVxuXG5cbiAgICByZXR1cm4gbmV3IFZub2RlKHR5cGUsIHByb3BzLCBrZXksIHJlZik7XG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuLyogTk9URTogcmVwbGFjZSB3aXRoIHZpcnR1YWwgbm9kZSovXG4vLyBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGVsLCBwcm9wcywgLi4uY2hpbGRyZW4pIHtcbi8vICAgICByZXR1cm4gYW5FbGVtZW50KGVsLCBwcm9wcywgY2hpbGRyZW4pO1xuLy8gfVxuXG5mdW5jdGlvbiBhbkVsZW1lbnQoZWxlbWVudCwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgaWYgKGlzQ2xhc3MoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZUNsYXNzKGVsZW1lbnQsIHByb3BzLCBjaGlsZHJlbik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRnVuYyhlbGVtZW50KSkge1xuICAgICAgICByZXR1cm4gZWxlbWVudChwcm9wcyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gaGFuZGxlRE9NTm9kZShlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlQ2xhc3MoY2xhenosIHByb3BzLCBjaGlsZHJlbikge1xuICAgIGNsYXNzQ291bnRlciArKztcbiAgICBpZihjbGFzc01hcFtjbGFzc0NvdW50ZXJdKSB7XG4gICAgICAgIHJldHVybiBjbGFzc01hcFtjbGFzc0NvdW50ZXJdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlYWN0RWxlbSA9IG5ldyBjbGF6eihwcm9wcyk7XG4gICAgcmVhY3RFbGVtLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgcmVhY3RFbGVtLnR5cGUgPSBSRUFDVF9DTEFTUztcbiAgICBjbGFzc01hcFtjbGFzc0NvdW50ZXJdID0gcmVhY3RFbGVtO1xuICAgIC8vIE5PVEU6IHJldHVybiB0aGUgb2JqIGluc3RlYWQgb2YgY2FsbGluZyByZW5kZXIoKSBoZXJlXG4gICAgcmV0dXJuIHJlYWN0RWxlbTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRE9NTm9kZShlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICBjb25zdCBhbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgaWYgKCBjaGlsZHJlbiAhPT0gbnVsbCApIHtcbiAgICAgICAgY2hpbGRyZW4ubWFwKChjKSA9PiB7XG4gICAgICAgICAgICBhcHBlbmRDaGlsZChhbkVsZW1lbnQsIGMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVycyBvciBhdHRyaWJ1dGVzIGZyb20gcHJvcHNcbiAgICBmb3IgKGxldCBwcm9wTmFtZSBpbiBwcm9wcykge1xuICAgICAgICBhcHBlbmRQcm9wKGFuRWxlbWVudCwgcHJvcE5hbWUsIHByb3BzW3Byb3BOYW1lXSk7XG4gICAgfVxuICAgIHJldHVybiBhbkVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENoaWxkKGVsZW1lbnQsIGNoaWxkKSB7XG4gICAgaWYgKGNoaWxkLnR5cGUgPT09ICdSRUFDVF9DTEFTUycpIHtcbiAgICAgICAgYXBwZW5kQ2hpbGQoZWxlbWVudCwgY2hpbGQucmVuZGVyKCkpO1xuICAgIH1cbiAgICBlbHNlIGlmKEFycmF5LmlzQXJyYXkoY2hpbGQpKSB7XG4gICAgICAgIGNoaWxkLm1hcChjaCA9PiB7ZWxlbWVudC5hcHBlbmRDaGlsZChjaCl9KTtcbiAgICB9XG4gICAgZWxzZSBpZih0eXBlb2YoY2hpbGQpID09PSAnb2JqZWN0Jyl7XG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgKz0gY2hpbGQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRQcm9wKGVsZW1lbnQsIHByb3BOYW1lLCBwcm9wVmFsKSB7XG4gICAgaWYgKGlzRXZlbnQocHJvcE5hbWUpKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihwcm9wTmFtZS5zdWJzdHJpbmcoMikudG9Mb3dlckNhc2UoKSwgcHJvcFZhbCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzQ2xhc3NOYW1lKHByb3BOYW1lKSkge1xuICAgICAgICBwcm9wTmFtZSA9ICdjbGFzcyc7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKHByb3BOYW1lLCBwcm9wVmFsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKHByb3BOYW1lLCBwcm9wVmFsKTtcbiAgICB9XG59XG5cbi8vIGNsYXNzIENvbXBvbmVudCB7XG4vLyAgICAgY29uc3RydWN0b3IocHJvcHMpIHtcbi8vICAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuLy8gICAgIH1cbi8vICAgICBzZXRTdGF0ZSAoc3RhdGUpIHtcbi8vICAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUsIHN0YXRlKTtcbi8vICAgICAgICAgcmVSZW5kZXIoKTtcbi8vICAgICB9XG4vLyB9XG5cbmZ1bmN0aW9uIHJlUmVuZGVyKCkge1xuICAgIC8vIGRlbGV0ZSBvbGQgZG9tIHRyZWVcbiAgICB3aGlsZShyb290RE9NRWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgcm9vdERPTUVsZW1lbnQucmVtb3ZlQ2hpbGQocm9vdERPTUVsZW1lbnQubGFzdENoaWxkKTtcbiAgICB9XG4gICAgLy8gcmVuZGVyIGFnYWluXG4gICAgY2xhc3NDb3VudGVyID0gMTsgLy8gc2tpcCB0aGUgcm9vdFxuICAgIFJlYWN0RE9NLnJlbmRlcihyb290UmVhY3RFbGVtZW50LCByb290RE9NRWxlbWVudCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjcmVhdGVFbGVtZW50LFxuICAgIENvbXBvbmVudCxcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/react.js\n");

/***/ }),

/***/ "./src/reactDOM.js":
/*!*************************!*\
  !*** ./src/reactDOM.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// const REACT_CLASS = 'REACT_CLASS';\n// TODO: refactor for Component wrapper\nfunction render(Vnode, container) {\n  // NOTE: 2 kinds of Vnode\n  if (!Vnode) return;\n  let {\n    type,\n    props\n  } = Vnode;\n  if (!type) return;\n  let {\n    children\n  } = props; // children is always an array, even []\n\n  const VnodeType = typeof type;\n  let domNode;\n\n  if (VnodeType === 'function') {\n    const VnodeRoot = renderComponent(Vnode);\n    type = VnodeRoot.type;\n    props = VnodeRoot.props;\n    children = props.children;\n    domNode = document.createElement(type);\n  } else if (VnodeType === 'string') {\n    domNode = document.createElement(type);\n  }\n\n  for (let i = 0; i < children.length; i++) {\n    mountChildren(children[i], domNode); // NOTE: recusion!\n  }\n\n  mapProps(domNode, props);\n  container.appendChild(domNode);\n}\n\nfunction renderComponent(VnodeWrapper) {\n  //\n  const ComponentClass = VnodeWrapper.type;\n  const {\n    props\n  } = VnodeWrapper;\n  const instance = new ComponentClass(props);\n  const unwrappedVnode = instance.render(); // generate Vnodes(like a tree) in class's render()\n\n  instance.Vnode = unwrappedVnode; // store Vnode into the instance for recording\n\n  return unwrappedVnode;\n}\n\nfunction mountChildren(child, domNode) {\n  // check children's type\n  if (typeof child === 'string') {\n    domNode.innerHTML += child;\n    return;\n  }\n\n  render(child, domNode);\n}\n\nfunction mapProps(domNode, props) {\n  for (let propsName in props) {\n    if (propsName === 'children') continue;\n\n    if (propsName === 'style') {\n      let style = props['style'];\n      Object.keys(style).forEach(styleName => {\n        domNode.style[styleName] = style[styleName];\n      });\n      continue;\n    }\n\n    domNode[propsName] = props[propsName];\n  }\n} // function render(el, domEl) {\n//     let rootDOMElement = domEl;\n//     let rootReactElement = el;\n//     let currentDOM;\n//     if (rootReactElement.type === REACT_CLASS) {\n//         currentDOM = rootReactElement.render();\n//     }\n//     else {\n//         currentDOM = rootReactElement;\n//     }\n//     domEl.appendChild(currentDOM);\n// }\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  render\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3RET00uanM/NDY5NyJdLCJuYW1lcyI6WyJyZW5kZXIiLCJWbm9kZSIsImNvbnRhaW5lciIsInR5cGUiLCJwcm9wcyIsImNoaWxkcmVuIiwiVm5vZGVUeXBlIiwiZG9tTm9kZSIsIlZub2RlUm9vdCIsInJlbmRlckNvbXBvbmVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImkiLCJsZW5ndGgiLCJtb3VudENoaWxkcmVuIiwibWFwUHJvcHMiLCJhcHBlbmRDaGlsZCIsIlZub2RlV3JhcHBlciIsIkNvbXBvbmVudENsYXNzIiwiaW5zdGFuY2UiLCJ1bndyYXBwZWRWbm9kZSIsImNoaWxkIiwiaW5uZXJIVE1MIiwicHJvcHNOYW1lIiwic3R5bGUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInN0eWxlTmFtZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUVBO0FBRUEsU0FBU0EsTUFBVCxDQUFnQkMsS0FBaEIsRUFBdUJDLFNBQXZCLEVBQWtDO0FBQUc7QUFDakMsTUFBSSxDQUFDRCxLQUFMLEVBQVk7QUFDWixNQUFJO0FBQUVFLFFBQUY7QUFBUUM7QUFBUixNQUFrQkgsS0FBdEI7QUFDQSxNQUFJLENBQUNFLElBQUwsRUFBVztBQUNYLE1BQUk7QUFBRUU7QUFBRixNQUFlRCxLQUFuQixDQUo4QixDQUlKOztBQUUxQixRQUFNRSxTQUFTLEdBQUcsT0FBT0gsSUFBekI7QUFDQSxNQUFJSSxPQUFKOztBQUVBLE1BQUdELFNBQVMsS0FBSyxVQUFqQixFQUE2QjtBQUN6QixVQUFNRSxTQUFTLEdBQUdDLGVBQWUsQ0FBQ1IsS0FBRCxDQUFqQztBQUNBRSxRQUFJLEdBQUdLLFNBQVMsQ0FBQ0wsSUFBakI7QUFDQUMsU0FBSyxHQUFHSSxTQUFTLENBQUNKLEtBQWxCO0FBQ0FDLFlBQVEsR0FBR0QsS0FBSyxDQUFDQyxRQUFqQjtBQUNBRSxXQUFPLEdBQUdHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QlIsSUFBdkIsQ0FBVjtBQUNILEdBTkQsTUFPSyxJQUFHRyxTQUFTLEtBQUssUUFBakIsRUFBMkI7QUFDNUJDLFdBQU8sR0FBR0csUUFBUSxDQUFDQyxhQUFULENBQXVCUixJQUF2QixDQUFWO0FBQ0g7O0FBRUQsT0FBSSxJQUFJUyxDQUFDLEdBQUMsQ0FBVixFQUFhQSxDQUFDLEdBQUNQLFFBQVEsQ0FBQ1EsTUFBeEIsRUFBZ0NELENBQUMsRUFBakMsRUFBb0M7QUFDaENFLGlCQUFhLENBQUNULFFBQVEsQ0FBQ08sQ0FBRCxDQUFULEVBQWNMLE9BQWQsQ0FBYixDQURnQyxDQUNNO0FBQ3pDOztBQUNEUSxVQUFRLENBQUNSLE9BQUQsRUFBVUgsS0FBVixDQUFSO0FBRUFGLFdBQVMsQ0FBQ2MsV0FBVixDQUFzQlQsT0FBdEI7QUFDSDs7QUFFRCxTQUFTRSxlQUFULENBQXlCUSxZQUF6QixFQUF1QztBQUFHO0FBQ3RDLFFBQU1DLGNBQWMsR0FBR0QsWUFBWSxDQUFDZCxJQUFwQztBQUNBLFFBQU07QUFBRUM7QUFBRixNQUFZYSxZQUFsQjtBQUNBLFFBQU1FLFFBQVEsR0FBRyxJQUFJRCxjQUFKLENBQW1CZCxLQUFuQixDQUFqQjtBQUVBLFFBQU1nQixjQUFjLEdBQUdELFFBQVEsQ0FBQ25CLE1BQVQsRUFBdkIsQ0FMbUMsQ0FLUTs7QUFFM0NtQixVQUFRLENBQUNsQixLQUFULEdBQWlCbUIsY0FBakIsQ0FQbUMsQ0FPRjs7QUFDakMsU0FBT0EsY0FBUDtBQUNIOztBQUVELFNBQVNOLGFBQVQsQ0FBdUJPLEtBQXZCLEVBQThCZCxPQUE5QixFQUF1QztBQUNuQztBQUNBLE1BQUcsT0FBT2MsS0FBUCxLQUFrQixRQUFyQixFQUErQjtBQUMzQmQsV0FBTyxDQUFDZSxTQUFSLElBQXFCRCxLQUFyQjtBQUNBO0FBQ0g7O0FBRURyQixRQUFNLENBQUNxQixLQUFELEVBQVFkLE9BQVIsQ0FBTjtBQUNIOztBQUVELFNBQVNRLFFBQVQsQ0FBa0JSLE9BQWxCLEVBQTJCSCxLQUEzQixFQUFpQztBQUM3QixPQUFLLElBQUltQixTQUFULElBQXNCbkIsS0FBdEIsRUFBNEI7QUFDeEIsUUFBSW1CLFNBQVMsS0FBSyxVQUFsQixFQUNJOztBQUNKLFFBQUlBLFNBQVMsS0FBSyxPQUFsQixFQUEyQjtBQUN2QixVQUFJQyxLQUFLLEdBQUdwQixLQUFLLENBQUMsT0FBRCxDQUFqQjtBQUNBcUIsWUFBTSxDQUFDQyxJQUFQLENBQVlGLEtBQVosRUFBbUJHLE9BQW5CLENBQTRCQyxTQUFELElBQWU7QUFDdENyQixlQUFPLENBQUNpQixLQUFSLENBQWNJLFNBQWQsSUFBMkJKLEtBQUssQ0FBQ0ksU0FBRCxDQUFoQztBQUNILE9BRkQ7QUFHQTtBQUNIOztBQUNEckIsV0FBTyxDQUFDZ0IsU0FBRCxDQUFQLEdBQXFCbkIsS0FBSyxDQUFDbUIsU0FBRCxDQUExQjtBQUNIO0FBQ0osQyxDQU1EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRWU7QUFDWHZCO0FBRFcsQ0FBZiIsImZpbGUiOiIuL3NyYy9yZWFjdERPTS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbnN0IFJFQUNUX0NMQVNTID0gJ1JFQUNUX0NMQVNTJztcblxuLy8gVE9ETzogcmVmYWN0b3IgZm9yIENvbXBvbmVudCB3cmFwcGVyXG5cbmZ1bmN0aW9uIHJlbmRlcihWbm9kZSwgY29udGFpbmVyKSB7ICAvLyBOT1RFOiAyIGtpbmRzIG9mIFZub2RlXG4gICAgaWYgKCFWbm9kZSkgcmV0dXJuO1xuICAgIGxldCB7IHR5cGUsIHByb3BzIH0gPSBWbm9kZTtcbiAgICBpZiAoIXR5cGUpIHJldHVybjtcbiAgICBsZXQgeyBjaGlsZHJlbiB9ID0gcHJvcHM7IC8vIGNoaWxkcmVuIGlzIGFsd2F5cyBhbiBhcnJheSwgZXZlbiBbXVxuXG4gICAgY29uc3QgVm5vZGVUeXBlID0gdHlwZW9mIHR5cGU7XG4gICAgbGV0IGRvbU5vZGU7XG5cbiAgICBpZihWbm9kZVR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgVm5vZGVSb290ID0gcmVuZGVyQ29tcG9uZW50KFZub2RlKTtcbiAgICAgICAgdHlwZSA9IFZub2RlUm9vdC50eXBlO1xuICAgICAgICBwcm9wcyA9IFZub2RlUm9vdC5wcm9wcztcbiAgICAgICAgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbjtcbiAgICAgICAgZG9tTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gICAgfVxuICAgIGVsc2UgaWYoVm5vZGVUeXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICBkb21Ob2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICB9XG5cbiAgICBmb3IobGV0IGk9MDsgaTxjaGlsZHJlbi5sZW5ndGg7IGkrKyl7XG4gICAgICAgIG1vdW50Q2hpbGRyZW4oY2hpbGRyZW5baV0sIGRvbU5vZGUpOyAgLy8gTk9URTogcmVjdXNpb24hXG4gICAgfVxuICAgIG1hcFByb3BzKGRvbU5vZGUsIHByb3BzKTtcblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkb21Ob2RlKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29tcG9uZW50KFZub2RlV3JhcHBlcikgeyAgLy9cbiAgICBjb25zdCBDb21wb25lbnRDbGFzcyA9IFZub2RlV3JhcHBlci50eXBlO1xuICAgIGNvbnN0IHsgcHJvcHMgfSA9IFZub2RlV3JhcHBlcjtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBDb21wb25lbnRDbGFzcyhwcm9wcyk7XG5cbiAgICBjb25zdCB1bndyYXBwZWRWbm9kZSA9IGluc3RhbmNlLnJlbmRlcigpOyAgLy8gZ2VuZXJhdGUgVm5vZGVzKGxpa2UgYSB0cmVlKSBpbiBjbGFzcydzIHJlbmRlcigpXG5cbiAgICBpbnN0YW5jZS5Wbm9kZSA9IHVud3JhcHBlZFZub2RlOyAvLyBzdG9yZSBWbm9kZSBpbnRvIHRoZSBpbnN0YW5jZSBmb3IgcmVjb3JkaW5nXG4gICAgcmV0dXJuIHVud3JhcHBlZFZub2RlO1xufVxuXG5mdW5jdGlvbiBtb3VudENoaWxkcmVuKGNoaWxkLCBkb21Ob2RlKSB7XG4gICAgLy8gY2hlY2sgY2hpbGRyZW4ncyB0eXBlXG4gICAgaWYodHlwZW9mKGNoaWxkKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZG9tTm9kZS5pbm5lckhUTUwgKz0gY2hpbGQ7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZW5kZXIoY2hpbGQsIGRvbU5vZGUpO1xufVxuXG5mdW5jdGlvbiBtYXBQcm9wcyhkb21Ob2RlLCBwcm9wcyl7XG4gICAgZm9yIChsZXQgcHJvcHNOYW1lIGluIHByb3BzKXtcbiAgICAgICAgaWYgKHByb3BzTmFtZSA9PT0gJ2NoaWxkcmVuJylcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBpZiAocHJvcHNOYW1lID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICBsZXQgc3R5bGUgPSBwcm9wc1snc3R5bGUnXVxuICAgICAgICAgICAgT2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goKHN0eWxlTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRvbU5vZGUuc3R5bGVbc3R5bGVOYW1lXSA9IHN0eWxlW3N0eWxlTmFtZV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgZG9tTm9kZVtwcm9wc05hbWVdID0gcHJvcHNbcHJvcHNOYW1lXTtcbiAgICB9XG59XG5cblxuXG5cblxuLy8gZnVuY3Rpb24gcmVuZGVyKGVsLCBkb21FbCkge1xuLy8gICAgIGxldCByb290RE9NRWxlbWVudCA9IGRvbUVsO1xuLy8gICAgIGxldCByb290UmVhY3RFbGVtZW50ID0gZWw7XG4vLyAgICAgbGV0IGN1cnJlbnRET007XG4vLyAgICAgaWYgKHJvb3RSZWFjdEVsZW1lbnQudHlwZSA9PT0gUkVBQ1RfQ0xBU1MpIHtcbi8vICAgICAgICAgY3VycmVudERPTSA9IHJvb3RSZWFjdEVsZW1lbnQucmVuZGVyKCk7XG4vLyAgICAgfVxuLy8gICAgIGVsc2Uge1xuLy8gICAgICAgICBjdXJyZW50RE9NID0gcm9vdFJlYWN0RWxlbWVudDtcbi8vICAgICB9XG4vLyAgICAgZG9tRWwuYXBwZW5kQ2hpbGQoY3VycmVudERPTSk7XG4vLyB9XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICByZW5kZXIsXG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/reactDOM.js\n");

/***/ })

/******/ });