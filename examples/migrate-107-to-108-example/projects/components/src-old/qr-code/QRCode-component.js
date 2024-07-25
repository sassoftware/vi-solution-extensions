/*
 * qr-code.js
 *
 * This component displays a field value as a QR code. It has
 * an optional title property that will be displayed if populated.
 *
 * The QR code is a Kendo widget. The API is here:
 * https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/qrcode#configuration
 */
(function () {
  angular.module("sngPageBuilderCustom").spbComponent("qrCode", {
    templateUrl: ["spbCustomControlUtilsService", function (spbCustomControlUtilsService) {
      return spbCustomControlUtilsService.getTemplateUrlByDirectiveName("qrCode");
    }],
    bindings: {
      childNode: "<",
      pageModel: "<"
    },
    controller: qrController
  });

  // Necessary for angular's dependency injection to work if you minify the code.
  qrController.$inject = ["spbPageModes"];

  function qrController(spbPageModes) {
    const ctrl = this;

    ctrl.$onInit = function () {
      ctrl.options = getOptions();
      ctrl.value = getDataSourceValue(ctrl.pageModel);
    };

    // Keep in mind this is run on every angular digest cycle.
    ctrl.$doCheck = function () {
      ctrl.value = getDataSourceValue(ctrl.pageModel);
    };

    // Most controls will behave differently depending on the current page mode.
    ctrl.inDesignMode = function () {
      // spbPageModes = DESIGN | VIEW | EDIT | CREATE
      return ctrl.pageModel.mode === spbPageModes.DESIGN;
    };

    function getOptions() {
      const color = "#2e547b";
      return {
        color: color,
        background: "transparent",
        border: {
          color: color,
          width: 5
        }
      };
    }

    function getDataSourceValue(pageModel) {
      // Different behaviour in design mode.
      if (ctrl.inDesignMode()) {
        return "https://www.sas.com";
      }

      const dataSource = ctrl.childNode.typeAttributes.dataSource;
      return pageModel.data[dataSource];
    }
  }
})();
