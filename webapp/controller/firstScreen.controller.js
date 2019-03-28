sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/odata/v2/ODataModel"
], function(Controller, MessageBox, ODataModel) {
	"use strict";
	return Controller.extend("zPowra.zPowra.controller.firstScreen", {
		onInit: function() {
			/*var UserInfo = sap.ushell.Container.getService("UserInfo");
            var user = UserInfo.getUser();
            var userName = user.getFullName();
            this.getView().byId("inputPar").setValue(userName);;*/ //works only on fiori launchpad
			sap.ui.core.IconPool.addIcon('Height', 'customfont', 'icomoon', 'e94c');
			sap.ui.core.IconPool.addIcon('Confined', 'customfont', 'icomoon', 'e90c');
			sap.ui.core.IconPool.addIcon('Fire', 'customfont', 'icomoon', 'e91c');
			sap.ui.core.IconPool.addIcon('Asp', 'customfont', 'icomoon', 'e900');
			sap.ui.core.IconPool.addIcon('Dust', 'customfont', 'icomoon', 'e912');
			sap.ui.core.IconPool.addIcon('Temp', 'customfont', 'icomoon', 'e932');
			sap.ui.core.IconPool.addIcon('Lift', 'customfont', 'icomoon', 'e923');
			sap.ui.core.IconPool.addIcon('Subs', 'customfont', 'icomoon', 'e93e');
			sap.ui.core.IconPool.addIcon('Ec', 'customfont', 'icomoon', 'e918');
			sap.ui.core.IconPool.addIcon('Traffic', 'customfont', 'icomoon', 'e948');
			sap.ui.core.IconPool.addIcon('Noise', 'customfont', 'icomoon', 'e92d');
			sap.ui.core.IconPool.addIcon('Slips', 'customfont', 'icomoon', 'e938');
			sap.ui.core.IconPool.addIcon('Manual', 'customfont', 'icomoon', 'e928');
			this.oModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("zPowra.zPowra.model",
				"/Data.json"));
			this.getView().setModel(this.oModel, "oModelData");
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1; //January is 0!
			var yyyy = today.getFullYear();
			var hours = today.getHours();
			var min = today.getMinutes();
			if (dd < 10) {
				dd = '0' + dd;
			}
			if (mm < 10) {
				mm = '0' + mm;
			}
			if (min < 10) {
				min = '0' + min;
			}
			today = mm + '/' + dd + '/' + yyyy + " " + " " + hours + ':' + min;
			this.getView().byId("todayDate").setText(today);
			var self = this;
			/*	var serviceUrl = "/ZCDS_APA_E_0279_CHARAC";
				this.getOwnerComponent().getModel("defaultModel").read(serviceUrl, {
					//filters: newsol,
					success: function(oData) {
						self.oModel = new sap.ui.model.json.JSONModel();
						self.oModel.setData(oData);
						self.getView().setModel(self.oModel);
						var hazardsData = self.getView().getModel("oModelData").getData().Forms;
						var array = [];
						var obj = {};
						var oRootPath = jQuery.sap.getModulePath("zPowra.zPowra");
						for (var i = 0; i < oData.results.length; i++) {
							if (oData.results[i].qtype === "00") {
								array.push(oData.results[i]);
								array[i].path = oRootPath;
							}
						}
						obj.Forms = array;
						self.oModel = new sap.ui.model.json.JSONModel();
						self.oModel.setData(obj);
						self.getView().setModel(self.oModel, "oModel");
						for (var j = 0; j < hazardsData.length; j++) {
							hazardsData[j].path = oRootPath;
							for (var k = 0; k < oData.results.length; k++) {
								if (hazardsData[j].qtype === oData.results[k].qtype) {
									hazardsData[j]["ques"] = [];
									hazardsData[j].ques.push(oData.results[k]);
									hazardsData[i].path = oRootPath;
								}
							}
						}
						self.oModelHazards = new sap.ui.model.json.JSONModel();
						self.oModelHazards.setData(hazardsData);
						self.getView().setModel(self.oModelHazards, "oModelHazards");
					},
					error: function(oData) {
						sap.m.MessageToast.show("Connection not established");
					}
				});*/
			var oModel3 = new sap.ui.model.odata.ODataModel(
				"/sap/opu/odata/sap/ZODATA_APA_E_0279_POWRA_SRV/", true);
			oModel3.read("/ZCDS_APA_E_0279_CHARAC", null, ["$format=json"], true, function(
				data) {
				//	var length = data.results.length;
				//	var newData = data.results.slice(10, length);
				self.oModel = new sap.ui.model.json.JSONModel();
				self.oModel.setData(data);
				self.getView().setModel(self.oModel);
				var hazardsData = self.getView().getModel("oModelData").getData().Forms;
				var array = [];
				var obj = {};
				for (var i = 0; i < data.results.length; i++) {
					if (data.results[i].qtype === "00") {
						array.push(data.results[i]);
					}

				}
				obj.Forms = array;
				self.oModel = new sap.ui.model.json.JSONModel();
				self.oModel.setData(obj);
				self.getView().setModel(self.oModel, "oModel");

				for (var j = 0; j < hazardsData.length; j++) {
					for (var k = 0; k < data.results.length; k++) {
						if (hazardsData[j].qtype === data.results[k].qtype) {
							hazardsData[j]["ques"] = [];
							hazardsData[j].ques.push(data.results[k]);
						}
					}
				}
				self.oModelHazards = new sap.ui.model.json.JSONModel();
				self.oModelHazards.setData(hazardsData);
				self.getView().setModel(self.oModelHazards, "oModelHazards");
			}, function(msg) {
				sap.m.MessageToast.show("Connection not established");
			});
		},
		handleLocation: function(oEvent) {
			this.id = oEvent.getParameter("id");
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("zPowra.zPowra.view.location", this);
				this._oDialog.setModel(this.getOwnerComponent().getModel("defaultModel"));
			}
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},
		handleLocationSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");

			var items = {
				path: '/ZCDS_APA_E_0279_F4FLOC',
				filters: [
					new sap.ui.model.Filter("tplnr", sap.ui.model.FilterOperator.Contains, sValue)
				],
				template: new sap.m.StandardListItem({
					title: "{tplnr}",
					description: "{pltxt}"
				})
			};
			var oList = oEvent.getSource().getAggregation("_dialog").getContent()[1];
			oList.bindItems(items);
		},
		handleLocationConfirm: function(oEvent) {
			var value = oEvent.getParameter("selectedItem").getTitle();
			this.getView().byId(this.id).setValue(value);
		},
		onNextPress2: function() {
			//	this.onSubmitForm(); /*testing*/
			this.navTo().to(this.createId("page4"));
		},
		navTo: function() {
			var result = this.byId("app");
			return result;
		},
		onProceedPress: function() {
			this.navTo().to(this.createId("page5"));
		},
		onNavBack: function() {
			this.navTo().to(this.createId("page3"));
		},
		onCancelPage5: function() {
			this.navTo().to(this.createId("page4"));
		},
		onAcceptPress: function(oEvent) {
			var count = 0;
			oEvent.getSource().setProperty("color", "#4682B4");
			var parent = oEvent.getSource().getParent().getParent();
			parent.getContent()[2].setVisible(false);
			var items = parent.getParent().getItems();
			for (var i = 0; i < items.length; i++) {
				var color = items[i].getContent()[1].getItems()[0].getProperty("color");
				if (color === "#4682B4") {
					this.getView().byId("proceed").setEnabled(false);
					count = count + 1;
				}
				if (count === items.length) {
					this.getView().byId("proceed").setEnabled(true);
				}

			}
			var item = oEvent.getSource().getParent().getItems()[1];
			item.setProperty("color", "#b4b4b4");
		},
		onRejectPress: function(oEvent) {
			oEvent.getSource().setProperty("color", "#4682B4");
			var parent = oEvent.getSource().getParent().getParent();
			parent.getContent()[2].setVisible(true);
			var items = parent.getParent().getItems();
			for (var i = 0; i < items.length; i++) {
				var color = items[i].getContent()[1].getItems()[1].getProperty("color");
				if (color === "#4682B4") {
					this.getView().byId("proceed").setEnabled(false);
				}
			}
			var item = oEvent.getSource().getParent().getItems()[0];
			item.setProperty("color", "#b4b4b4");
		},
		onAcceptPressImageHazards: function(oEvent) {
			var count = 0,
				iconclicked = 0;
			oEvent.getSource().setProperty("color", "#4682B4");
			oEvent.getSource().getParent().getParent().getParent().getContent()[2].setVisible(false);
			var items = oEvent.getSource().getParent().getParent().getParent().getParent().getItems();
			for (var i = 0; i < items.length; i++) {
				var iconselected = oEvent.getSource().getParent().getParent().getParent().getParent().getItems()[i].getContent()[0].getItems()[0].getProperty(
					"color");
				if (iconselected === "black") {
					var visible = items[i].getContent()[1].getVisible();
					if (visible === true) {
						iconclicked = iconclicked + 1;
					} else {
						iconclicked = 0;
					}
					var color = items[i].getContent()[1].getItems()[1].getItems()[0].getColor();

					if (color === "#4682B4") {
						this.getView().byId("submit").setEnabled(false);
						count = count + 1;
					}
					if (count === iconclicked) {
						this.getView().byId("submit").setEnabled(true);
					}
				}
			}
			var item = oEvent.getSource().getParent().getItems()[1];
			item.setProperty("color", "#b4b4b4");
		},
		onRejectPressImageHazards: function(oEvent) {
			oEvent.getSource().setProperty("color", "#4682B4");
			oEvent.getSource().getParent().getParent().getParent().getContent()[2].setVisible(true);
			var items = oEvent.getSource().getParent().getParent().getParent().getParent().getItems();
			for (var i = 0; i < items.length; i++) {
				var color = items[i].getContent()[1].getItems()[1].getItems()[1].getColor();
				if (color === "#4682B4") {
					this.getView().byId("submit").setEnabled(false);
				}
			}
			var item = oEvent.getSource().getParent().getItems()[0];
			item.setProperty("color", "#b4b4b4");
		},

		onIconPress: function(oEvent) {
			oEvent.getSource().getParent().getParent().getContent()[2].setVisible(false);
			var color = oEvent.getSource().getProperty("color");
			if (color === "#E6E6FA") {
				var index = oEvent.getSource().getProperty("alt");
				var newIndex;
				if (index < 10) {
					newIndex = index.slice(1, 2) - 1;
				} else {
					newIndex = index - 1;
				}
				var data = this.getView().getModel("oModelHazards").getData();
				if (data[newIndex].ques === undefined) {
					oEvent.getSource().setProperty("color", "black");
					oEvent.getSource().getParent().getParent().getContent()[1].setVisible(false);
				} else {
					oEvent.getSource().setProperty("color", "black");
					oEvent.getSource().getParent().getParent().getContent()[1].setVisible(true);
				}
			} else {
				oEvent.getSource().setProperty("color", "#E6E6FA");
				oEvent.getSource().getParent().getParent().getContent()[1].setVisible(false);
			}
			var items = oEvent.getSource().getParent().getParent().getParent().getItems();
			for (var i = 0; i < items.length; i++) {
				var iconselected = items[i].getContent()[0].getItems()[0].getProperty("color");
				if (iconselected === "black") {
					this.getView().byId("submit").setEnabled(true);
					break;
				} else {
					this.getView().byId("submit").setEnabled(false);
				}
			}
			/*else {
				this.getView().byId("submit").setEnabled(false);
			}*/

		},

		onSubmitForm: function() {
			var _self = this;
			var dialog = new sap.m.Dialog({
				title: 'Confirm',
				type: 'Message',
				content: new sap.m.Text({
					text: 'Are you sure you want to submit PoWRA Form?'
				}),
				beginButton: new sap.m.Button({
					text: 'Submit',
					press: function() {
						var date = _self.getView().byId("todayDate").getText();
						var year = date.substring(6, 10);
						var month = date.substring(0, 2);
						var day = date.substring(3, 5);
						var newDate = year + month + day;
						var hours = date.substring(12, 14);
						var min = date.substring(15, 18);
						var newTime = hours + min + '00';
						var payload = {
							chrct: {
								results: []
							}
						};
						//	var data = {};
						payload.Perassignrskcode = _self.getView().byId("inputPar").getValue();
						payload.Perinvolvedesc = _self.getView().byId("inputPiit").getValue();
						payload.Notino = "";
						payload.Businessunitdesc = _self.getView().byId("inputBu").getValue();
						payload.Departmentdesc = _self.getView().byId("inputDep").getValue();
						payload.Teamdesc = _self.getView().byId("inputTeam").getValue();
						payload.Jobnodesc = _self.getView().byId("inputJob").getValue();
						payload.Conducteddate = null;
						payload.Conductedtime = null;
						payload.Task = _self.getView().byId("textTask").getValue();
						payload.Flocationcode = _self.getView().byId("inputLoc").getValue();
						payload.Locationdesc = _self.getView().byId("inputLocDesc").getValue();
						var a = [];
						var modelData = _self.getView().getModel("undefined").getData();
						for (var i = 0; i < modelData.results.length; i++) {
							var data = {};
							data.Perassignrskcode = _self.getView().byId("inputPar").getValue();
							data.Perinvolvedesc = _self.getView().byId("inputPiit").getValue();
							data.Notino = "";
							data.Code = "";
							data.Codegrp = "";
							data.Characteristicname = modelData.results[i].Characteristicname;
							data.Characteristicvalue = "YES";
							a.push(data);
							//payload.chrct.results.push(data);
						}
						payload.chrct.results = a;

						var readReqURL = "/sap/opu/odata/sap/ZODATA_APA_E_0279_POWRA_SRV/";
						this.oModelOdata2 = new sap.ui.model.odata.ODataModel(readReqURL);
						this.oModelOdata2.create("/POWRASet", payload, {
							success: function(oData, oResponse) {
								var bCompact = !!_self.getView().$().closest(".sapUiSizeCompact").length;
								MessageBox.success(
									"PoWRa Form Submitted", {
										styleClass: bCompact ? "sapUiSizeCompact" : ""
									}
								);
							},
							error: function(oData, oResponse) {
								sap.m.MessageToast.show("Data not updated");
							}
						});
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
		}

	});
});