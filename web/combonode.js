/**/

import { app } from "../../scripts/app.js"

const TypeSlot = {
    Input: 1,
    Output: 2,
};

const TypeSlotEvent = {
    Connect: true,
    Disconnect: false,
};

const _ID = "ComboDynamicNodeCozy";

app.registerExtension({
	name: 'cozy_comfy.' + _ID,
	async beforeRegisterNodeDef(nodeType, nodeData, app) {
        // skip the node if it is not the one we want
        if (nodeData.name !== _ID) {
            return
        }

        // track connection to set remote combobox when the local changes
        let combo_remote = null;

        const onNodeCreated = nodeType.prototype.onNodeCreated;
        nodeType.prototype.onNodeCreated = async function () {
            const me = await onNodeCreated?.apply(this, arguments);
            const combo = this.widgets.find(w => w.name == 'combo');

            combo.callback = () => {
                this.combo_remote.value = combo.value;
            }

            return me;
        }

        const onConnectOutput = nodeType.prototype.onConnectOutput;
        nodeType.prototype.onConnectOutput = function(outputIndex, inputType, inputSlot, inputNode) {
            // making sure we are using the OUTPUT slot we want to check for pulling combination values
            if (outputIndex == 0) {

                // the combo widget we are connecting
                this.combo_remote = inputNode.widgets.find(w => w.name == inputSlot.name);
                const values = this.combo_remote.options.values;

                // the local combobox widget to "populate" with the connected widget's values
                const combo = this.widgets.find(w => w.name == 'combo');
                combo.options.values = values;
                if (this.combo_remote.value) {
                    combo.value = this.combo_remote.value;
                }

                // a local text display to show the connected combobox widget values
                const text = this.widgets.find(w => w.name == 'text');
                text.value = values.join('\n');
            }
            return onConnectOutput?.apply(this, arguments);
        }

        const onConnectionsChange = nodeType.prototype.onConnectionsChange;
        nodeType.prototype.onConnectionsChange = function (slotType, slot, event)
        {
            // when we disconnect the OPTIONS output slot, we should clear the local combobox options
            if (slotType == TypeSlot.Output && slot == 0 && event == TypeSlotEvent.Disconnect) {
                const combo = this.widgets.find(w => w.name == 'combo');
                combo.options.values = [];
                combo.value = "";

                const text = this.widgets.find(w => w.name == 'text');
                text.value = "";

                this.combo_remote = null;
            }
            return onConnectionsChange?.apply(this, arguments);
        };

        return nodeType;
    },
})
