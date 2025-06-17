"""
@title: cozy_combo_dynamic
@author: amorano
@category: Example
@reference: https://github.com/cozy-comfyui/cozy_combo_dynamic
@tags: dynamic, example, developer, script, mechanism, exemplar
@description: Example of a Combo widget getting its values from being connected
to another combo widget
@node list:
    ComboDynamicNodeCozy
@version: 1.0.0
"""

# =============================================================================
# === GLOBAL ===
# =============================================================================

from typing import Any


NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}
WEB_DIRECTORY = "./web"
__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]

# =============================================================================
# === NODE ===
# =============================================================================

class ComboDynamicNodeCozy:
    """
    A class to represent a dynamic combo changer in ComfyUI.
    """
    RETURN_TYPES = ("COMBO",)
    RETURN_NAMES = ("OPTIONS",)
    OUTPUT_IS_LIST = (False,)
    OUTPUT_TOOLTIPS = (
        "Plug into an existing Combobox widget to grab it's values",
    )
    CATEGORY = "_EXAMPLES"

    @classmethod
    def INPUT_TYPES(s) -> dict[str, tuple[Any]]:
        return {
            "required": {},
            "optional": {
                "combo": ([], {"default": ""}),
                "text": ("STRING", {"default": "", "multiline": True})
            }
        }

# =============================================================================
# === REGISTRATION ===
# =============================================================================

NODE_CLASS_MAPPINGS = {
    "ComboDynamicNodeCozy": ComboDynamicNodeCozy,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "ComboDynamicNodeCozy": "Combo Dynamic (cozy)",
}
