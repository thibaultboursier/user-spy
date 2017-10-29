module.exports = trustAsHtml;

trustAsHtml.$inject = ['$sce'];

function trustAsHtml($sce) {
    return $sce.trustAsHtml;
}